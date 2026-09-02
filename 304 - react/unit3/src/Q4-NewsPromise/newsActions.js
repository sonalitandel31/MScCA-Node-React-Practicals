export const fetchNews = () => ({
    type: "FETCH_NEWS",
    payload: new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    id: 1,
                    title: "New Technology Trends",
                    description:
                        "Artificial intelligence and cloud computing are changing modern applications.",
                },
                {
                    id: 2,
                    title: "React Development",
                    description:
                        "React continues to be widely used for building modern user interfaces.",
                },
                {
                    id: 3,
                    title: "JavaScript Updates",
                    description:
                        "Modern JavaScript provides powerful features for web application development.",
                },
            ]);
        }, 1500);
    }),
});