using RepeaterASPBack.Models;

namespace RepeaterASPBack.DTOs;

public static class Dto
{
    public record CreateTopicRequest(int Number, string TopicName, string Question, string ShortAnswer, string LongAnswer, string Hints);

    public record TopicGroupedOrdered(string TopicName, List<Topic> Data);

    ///* Id, Number, TopicName, Question, ShortAnswer, LongAnswer, Hints, AddDate, Stage, TotalChecksAmount, Rate, LastCheck, NextCheck*/
    public record TrainerDataResponse(Guid Id, int Number, string TopicName, string Question, string ShortAnswer, string LongAnswer,
        string[] Hints, DateTime AddDate, Stage Stage, int TotalChecksAmount, int Rate, DateTime LastCheck, DateTime NextCheck, string QuestionBackground);

    public record TrainerDataDatesToStringsResponse(Guid Id, int Number, string TopicName, string Question, string ShortAnswer, string LongAnswer,
        string[] Hints, string AddDate, Stage Stage, int TotalChecksAmount, int Rate, string LastCheck, string NextCheck, string QuestionBackground);

    public record IdRateRequest(Guid Id, int Rate);

    public record UpdateTopicDataRequest(Guid Id, int Number, string TopicName, string Question, string ShortAnswer, string LongAnswer, string Hints);
}
