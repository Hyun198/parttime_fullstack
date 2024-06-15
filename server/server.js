const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');
const app = express();
const port = 8000;

app.use(cors());


const crawling = async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        const url = 'https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=cgv+%EA%B9%80%ED%8F%AC%ED%95%9C%EA%B0%95';

        await page.goto(url);

        const times = await page.evaluate(() => {
            return Array.from(document.querySelectorAll(".movie_content._wrap_time_table  span.time_info a")).map(x => x.textContent)
        });

        await browser.close();

        const timeToMinutes = (time) => {
            const [hour, minute] = time.split(':').map(Number);
            return hour * 60 + minute;
        };
        times.sort((time1, time2) => {
            const minutes1 = timeToMinutes(time1);
            const minutes2 = timeToMinutes(time2);
            return minutes1 - minutes2;
        });

        const data = { times };


        const lastTime = times[times.length - 1];
        console.log(lastTime); //마지막 시간만 
        return lastTime;
    } catch (err) {
        console.error("크롤링에러", err);
    }
}


app.get('/', async (req, res) => {
    try {
        const movieTimes = await crawling();
        res.json(movieTimes);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to fetch movie times.' });
    }


});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
