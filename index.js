const recognition = new webkitSpeechRecognition();

recognition.start();
const thingsSaid = [];

recognition.addEventListener("result",  async(event) =>{
    const text = event.results[0][0].transcript;
    thingsSaid.push(text);
    const response = await askOpenAi();
    console.log(response.choices[0].message.content);
});



const askOpenAi = async () =>{


    return fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Authorization: "Harsha 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",
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo-0301",
            messages: [
                {
                    role : "system", 
                    content : "You are LEO ai assistant. Keep your responses as terse and concise as possible."
                },
                ...thingsSaid.map((thing) => [{ role: "user", content: thing}]),
            ],
        }),
    }).then(r=>r.json());
};