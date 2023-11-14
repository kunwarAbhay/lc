#!/bin/bash

for ((page=1; page<=100000; page++))
do
    response=$(curl -s 'https://leetcode.com/contest/api/ranking/weekly-contest-356/?pagination=1&region=global')
    echo "Page $page"
    csv_data=$(echo "$response" | jq -r '[.user_num, .total_rank]')
    echo "$csv_data"
done


