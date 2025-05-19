

async function PostLibros(obj) {


    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzQ2ODI5ODY5LCJpYXQiOjE3NDY4MjYyNjksImp0aSI6IjMxYTA1ZDcxMGE3NzQyNWRhNjRiY2UwNDczZjE4OWUyIiwidXNlcl9pZCI6NH0.a3INJGwmJCCXabOSWK9U4k2Cc4RJXBIV4B1StV7ZwbY"

    try {
        const response = await fetch("http://127.0.0.1:8000/api/libros/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },

            body: JSON.stringify(obj)
        });

        if (!response.ok) {
            throw new Error('Error fetching libros');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching libros:', error);
        throw error;
    }
}

export default PostLibros