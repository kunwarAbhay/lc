const profileQuery = `
query userPublicProfile($username: String!) {
    matchedUser(username: $username) {
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
        }
    }
}`

const contestRanking = `
query ($username: String!) {
  matchedUser(username: $username) {
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
        }
    }

    userContestRanking(username: $username) {
        rating
        globalRanking
    }
   }
`

const currentRating = `query ($username: String!) {
    userContestRanking(username: $username) {
        rating 
    }
} `

const currentRatingCN = `query ($username: String!) {
    userContestRanking(userSlug: $username) {
        rating 
    }
} `

module.exports = {
    profileQuery, contestRanking, currentRating, currentRatingCN
}
