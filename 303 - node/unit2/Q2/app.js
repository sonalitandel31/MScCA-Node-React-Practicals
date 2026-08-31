const fetchUsers = async () => {
    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const users = await response.json();

        users.forEach((user) => {
            console.log(`Name: ${user.name}`);
            console.log(`Email: ${user.email}`);
            console.log("--------------------");
        });
    } catch (error) {
        console.error("Error fetching data:", error.message);
    }
};

fetchUsers();