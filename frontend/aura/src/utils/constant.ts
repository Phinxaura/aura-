export const USER_ENDPOINT = "http://localhost:8080/api/v1/user/";
export const TWEET_API_ENDPOINT = "http://localhost:8080/api/v1/tweet/";
export const timeSince = (timestamp: any) => {
    let time = Date.parse(timestamp);
    if (isNaN(time)) return "Invalid date";
    let now = Date.now();
    let secondsPast = (now - time) / 1000;
    let suffix = 'ago';

    let intervals: any = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1,
    };

    for (let i in intervals) {
        let interval = intervals[i];
        //previously function returns the undefined because the secondpast is smaller than 1 like 0.something that's why it is not meet the condition and returned undefined  so we return the just now when no condition meets the condtion and it doesn't return anything ........
                
        if (secondsPast >= interval) {
            let count = Math.floor(secondsPast / interval);
            return `${count} ${i}${count > 1 ? 's' : ''} ${suffix}`;
        }
    }
    // Fallback for less than 1 second
    return "just now";
    //so here we return just now when condition not match then it shows just now ........
}
