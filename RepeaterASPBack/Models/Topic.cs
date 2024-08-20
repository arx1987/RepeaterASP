namespace RepeaterASPBack.Models;

public class Topic
{
    public Topic(int number, string topicName, string question, string shortAnswer, string longAnswer, 
        string hints)
    {
        Id = Guid.NewGuid();
        Number = number;
        TopicName = topicName;
        Question = question;
        ShortAnswer = shortAnswer;
        LongAnswer = longAnswer;
        Hints = hints;
        AddDate = DateTime.UtcNow;
        Stage = Stage.ZeroStage;
        TotalChecksAmount = 0;
        Rate = 0;
        LastCheck = DateTime.UtcNow;
        NextCheck = DateTime.UtcNow.AddYears(1);
    }
    public Guid Id { get; set; }
    public int Number { get; set; }
    public string TopicName { get; set; }
    public string Question { get; set; }
    public string ShortAnswer { get; set; }
    public string LongAnswer { get; set; }
    public string Hints { get; set; }
    public DateTime AddDate { get; set; }
    public Stage Stage { get; set; }
    public int TotalChecksAmount { get; set; }
    public int Rate { get; set; }
    public DateTime LastCheck { get; set; }
    public DateTime NextCheck { get; set; }
}
