#!/bin/bash

rankingQuery='query {
    globalRanking(page: PAGE_NUMBER) {
        rankingNodes {
            currentRating
            currentGlobalRanking
            user {
                username
                githubUrl
                linkedinUrl
                profile {
                    ranking
                    userAvatar
                    realName
                    aboutMe
                    school
                    websites
                    skillTags
                    countryCode
                    countryName
                    realName
                }
            }
        }
    }
}'


# Loop through pages from 1 to 10
for ((page=1; page<=100000; page++))
do
    # Replace PAGE_NUMBER in the query with the current page value
    script="${rankingQuery/PAGE_NUMBER/$page}"
    script="$(echo $script)"
    response=$(curl -s  'https://leetcode.com/graphql/' \
  -H 'authority: leetcode.com' \
  -H 'accept: */*' \
  -H 'accept-language: en-US,en;q=0.9' \
  -H 'authorization;' \
  -H 'baggage: sentry-environment=production,sentry-release=e3012f32,sentry-transaction=%2Fu%2F%5Busername%5D,sentry-public_key=2a051f9838e2450fbdd5a77eb62cc83c,sentry-trace_id=2a177334ee9047fc9bb5de147d426ec9,sentry-sample_rate=0.03' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'cookie: NEW_PROBLEMLIST_PAGE=1; __stripe_mid=178b817c-bc77-4967-b04f-4d8f52e6103300ec63; csrftoken=T7LKg9yLfpTsJysVeJ131REqq8c6BBxDsVqze2U1B7xh84xRodx1DCvyr872MzHh; messages="7f15db27c375256c81b3f616c3fee7d4a8fbf2f3$[[\"__json_message\"\0540\05425\054\"Successfully signed in as theanuragshukla.\"]\054[\"__json_message\"\0540\05425\054\"You have signed out.\"]\054[\"__json_message\"\0540\05420\054\"Confirmation e-mail sent to tachyonanurag@gmail.com.\"]\054[\"__json_message\"\0540\05425\054\"Successfully signed in as anuragnotfound.\"]]"' \
  -H 'dnt: 1' \
  -H 'origin: https://leetcode.com' \
  -H 'pragma: no-cache' \
  -H 'random-uuid: a228855d-6a6b-fafd-40ec-c8145a38ce16' \
  -H 'referer: https://leetcode.com/vs8942999/' \
  -H 'sec-ch-ua: "Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "Windows"' \
  -H 'sec-fetch-dest: empty' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-site: same-origin' \
  -H 'sentry-trace: 2a177334ee9047fc9bb5de147d426ec9-b4842fcb63a96f50-0' \
  -H 'user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36' \
  -H 'x-csrftoken: T7LKg9yLfpTsJysVeJ131REqq8c6BBxDsVqze2U1B7xh84xRodx1DCvyr872MzHh' \
        -X POST -d "{ \"query\": \"$script\"}" | jq  '.data.globalRanking.rankingNodes')

    echo "Page $page:"
    echo "$response"
    csv_data=$(echo "$response" | jq -r '.[] | [.currentRating, .currentGlobalRanking, .user.username, .user.profile.ranking, .user.profile.userAvatar, .user.profile.countryCode, .user.profile.countryName, .user.githubUrl, .user.linkedinUrl, .user.profile.realName, .user.profile.aboutMe, .user.profile.school,
    (.user.profile.websites // [] |  join(","))
    , (.user.profile.skillTags // []  |join(","))] | @csv')
echo "$csv_data" >> output.csv
done


