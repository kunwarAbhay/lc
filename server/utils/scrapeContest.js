const { performance } = require("perf_hooks");

const baseURL = 'https://leetcode.com/contest/api/ranking';
const axios = require('axios').default
const contest = require('./models/contest.js')

const getContestName = (number, isBiweekly) => `${isBiweekly ? "biweekly":"weekly"}-contest-${number}`

const main = async (number, isBiweekly) => {
    const client = axios.create({
        baseURL: `${baseURL}/${getContestName(number, isBiweekly)}`
    })
    const tmp = await client.get('/', {
        params: {
            pagination: 1,
            region: "global"
        }
    })
    const { user_num } = tmp.data
    const users = 0;
    let page = 1
    while (users < user_num) {
        const startTime = performance.now()
        try {
            const response = await client.get("/", {
                params: {
                    pagination: page++,
                    region: "global"
                }
            })
            const data = response.data.total_rank.map(({ username, rank, score }) => ({ username, score, rank }))
            const fetchDelay = performance.now()
            try {
                const res = await contest.insertMany(data)
            } catch (error) {
                console.log(error)
            }
            const uploadDelay = performance.now()
            console.log(page, fetchDelay - startTime, uploadDelay - fetchDelay)

        } catch (error) {
            console.error(`Error fetching data for Page ${page}: ${error.message}`);
            break;
        }
    }
}



