const buildQuery = async ({ text, school, countryCode }) => {
    const arr = [];

    if (validate(text)) {
        const obj = {
            $or: [
                {
                    user: {
                        $regex: text,
                        $options: "i",
                    },
                },
                {
                    username: {
                        $regex: text,
                        $options: "i",
                    },
                },
            ],
        };
        arr.push(obj);
    }

    if (validate(school)) {
        const obj = {
            school: {
                $regex: school,
                $options: "i",
            },
        };
        arr.push(obj);
    }

    if (validate(countryCode)) {
        const obj = {
            countryCode: {
                $regex: countryCode,
                $options: "i",
            },
        };
        arr.push(obj);
    }
    if(arr.length===0)return {}

    const query = {
        $and: [...arr],
    };
    return query;
};

const validate = (str = "") => str.trim().length !== 0;


module.exports = { buildQuery, validate };
