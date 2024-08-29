using Azure.Core;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RepeaterASPBack.DataAccess;
using RepeaterASPBack.Models;
using static RepeaterASPBack.DTOs.Dto;

namespace RepeaterASPBack.Controllers;

[ApiController]
[Route("[controller]")]
public class TopicsController : ControllerBase
{
    private readonly TopicDbContext _dbContext;

    public TopicsController(TopicDbContext dbContext)
    {
        _dbContext = dbContext;
    }
    /* в бд столбцы:TopicName, Question, ShortAnswer, LongAnswer, Hints имеют тип nvarchar(MAX)
    /*Number, TopicName, Question, ShortAnswer, LongAnswer, Hints*/
    [HttpPost]
    public async Task<IActionResult> CreateTopic([FromBody] DTOs.Dto.CreateTopicRequest req, CancellationToken ct)
    {
        if (await _dbContext.Topics.AnyAsync(x => x.Number == req.Number)) return BadRequest("such Number has already existed");
        if (await _dbContext.Topics.AnyAsync(a => a.TopicName == req.TopicName && a.Question == req.Question)) 
            return BadRequest("Such question from this topic has already existed");
        var topic = new Topic(req.Number, req.TopicName, req.Question, req.ShortAnswer, req.LongAnswer, req.Hints);
        //var repeaterInfo = new RepeatInfo(req.Id, req.Hints, DateTime.Now, Stage.ZeroStage, 0, 1, DateTime.Now, DateTime.Now);
        await _dbContext.Topics.AddAsync(topic, ct);
        //await _dbContext.RepeatInfos.AddAsync(repeaterInfo, ct);
        await _dbContext.SaveChangesAsync(ct);
        return Ok(topic);
    }    
    [HttpGet]
    //public async Task<Topic[]> GetAllTopics() => await _dbContext.Topics.OrderBy(u => u.Number).ToArrayAsync();
    public async Task<IActionResult> GetAllTopics()
    {
        var some = await _dbContext.Topics.OrderBy(a => a.Number).GroupBy(b => b.TopicName).Select(grp => new TopicGroupedOrdered(grp.Key, grp.OrderBy(c => c.Number).ToList())).ToArrayAsync();
        return Ok(some);
    }
    /* Id, Number, TopicName, Question, ShortAnswer, LongAnswer, Hints, AddDate, Stage, TotalChecksAmount, Rate, LastCheck, NextCheck*/
    [HttpGet("TrainerData")]
    public async Task<IActionResult> GetDataForTrainer()
    {
        //var some = await _dbContext.Topics.OrderBy(a => a.NextCheck).Select(a => new TrainerDataResponse(a.Id, a.Number, a.TopicName, a.Question, a.ShortAnswer, a.LongAnswer, a.Hints.Trim().Split(';', StringSplitOptions.None), a.AddDate, a.Stage, a.TotalChecksAmount, a.Rate, a.LastCheck, a.NextCheck, CalculateBackground(a.NextCheck))).ToArrayAsync();
        var some = await _dbContext.Topics.OrderBy(a => a.NextCheck).Select(a => new TrainerDataDatesToStringsResponse(a.Id, a.Number, a.TopicName, a.Question, a.ShortAnswer, a.LongAnswer, a.Hints.Trim().Split(';', StringSplitOptions.None), DateToLocalString(a.AddDate), a.Stage, a.TotalChecksAmount, a.Rate, DateToLocalString(a.LastCheck), DateToLocalString(a.NextCheck), CalculateBackground(a.NextCheck))).ToArrayAsync();
        return Ok(some);
    }
    [HttpPost("TrainerData")]
    public async Task<IActionResult> UpdateTrainerData(DTOs.Dto.IdRateRequest req)
    {
        var some0 = await _dbContext.Topics.FirstAsync(a => a.Id == req.Id);
        some0.Rate = req.Rate;
        var now = DateTime.UtcNow;
        some0.LastCheck = now;
        some0.Stage = CalculateStage(some0.Rate, some0.Stage);
        some0.NextCheck = CalculateNextCheck(some0.Stage);
        some0.TotalChecksAmount++;
        await _dbContext.SaveChangesAsync();
        return Ok(some0);
    }
    /*[HttpGet]
    public async Task<IActionResult> GetTopicById(Guid id)
    {
        if (id == Guid.Empty) return BadRequest("guid is empty");
        var topic = await _dbContext.Topics.FirstAsync(x => x.Id == id);
        return Ok(topic);
    }*/
    [HttpPost("UpdateTopicData")]
    public async Task<IActionResult> UpdateTopicData(DTOs.Dto.UpdateTopicDataRequest req)
    {
        var topic = await _dbContext.Topics.FirstOrDefaultAsync(u => u.Id == req.Id);
        if(topic == null) return NotFound();
        topic.Number = req.Number;
        topic.TopicName = req.TopicName;
        topic.Question = req.Question;
        topic.ShortAnswer = req.ShortAnswer;
        topic.LongAnswer = req.LongAnswer;
        topic.Hints = req.Hints;
        await _dbContext.SaveChangesAsync();
        //var topic1 = topic with { Number = topicData.Number, TopicName = topicData.TopicName, Question = topicData.Question, ShortAnswer = topicData.ShortAnswer, LongAnswer = topicData.LongAnswer };
        /*var changedTopic = await _dbContext.Topics.Where(x => x.Id == topicData.Id)
            .ExecuteUpdateAsync<Topic>(q => q.SetProperty(y => y.Number, topicData.Number));*/
        return Ok(topic);
    }

    //начался говнокод
    static Stage CalculateStage(int rate, Stage stage) {
        var st = (int)stage;
        return (rate, (int)stage) switch
        {
            ( _, 0 ) => Stage.FirstStage,
            ( < 5, _ ) => Stage.FirstStage,
            ( >= 5, 1 ) => Stage.SecondStage,
            ( >= 5 and < 7, >= 2 and < 11 ) => Stage.ThirdStage,
            ( >= 7 and <= 8, 3) => Stage.ThirdStage,
            ( 7, > 3 and < 11 ) => (Stage)st - 1,
            ( 8, > 3 and < 11 ) => (Stage)st,
            ( >= 9, > 1 and < 10 ) => (Stage)st + 1,
            ( >= 9, 10 ) => Stage.TenthStage,
            ( _, _ ) => Stage.FirstStage
        };
    }
    static DateTime CalculateNextCheck(Stage stage) => (stage) switch
    {
        Stage.ZeroStage => DateTime.UtcNow,
        Stage.FirstStage => DateTime.UtcNow.AddMinutes(30),
        Stage.SecondStage => DateTime.UtcNow.AddHours(8),
        Stage.ThirdStage => DateTime.UtcNow.AddDays(1),
        Stage.FourthStage => DateTime.UtcNow.AddDays(2),
        Stage.FifthStage => DateTime.UtcNow.AddDays(4),
        Stage.SixthStage => DateTime.UtcNow.AddDays(8),
        Stage.SeventhStage => DateTime.UtcNow.AddDays(15),
        Stage.EighthStage => DateTime.UtcNow.AddMonths(1),
        Stage.NinethStage => DateTime.UtcNow.AddMonths(2),
        Stage.TenthStage => DateTime.UtcNow.AddMonths(4),
        _ => DateTime.UtcNow
    };
    static string CalculateBackground(DateTime nextCheck)
    {
        double timeSpanSec = nextCheck.Subtract(DateTime.UtcNow).TotalSeconds;
        return timeSpanSec switch
        {
            < -345599 => "red.400",//"bg-red-400",
            < -259200 and >= -345599 => "orange.400",//"bg-orange-500",
            < -172800 and >= -259200 => "orange.200",//"bg-orange-200",
            < -86400 and >= -172800 => "yellow.200",//"bg-yellow-200",
            < 0 and >= -86400 => "cyan.300",//"bg-cyan-200",
            < 28799 and >= 0 => "green.50",//"bg-green-50",
            < 86399 and >= 28799 => "green.100",//"bg-green-100",
            < 172799 and >= 86399 => "green.200",//"bg-green-200",
            < 259199 and >= 172799 => "green.300",//"bg-green-300",
            >= 259199 => "green.400",//"bg-green-400",
            _ => ""
        };
    }
    static string DateToLocalString(DateTime date) => date.ToLocalTime().ToString("yyyy-MM-dd hh:mm");
    
}
