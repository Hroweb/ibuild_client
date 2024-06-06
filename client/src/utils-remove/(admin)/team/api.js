async function updateTeamMembers(data){
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/team/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Origin': process.env.SITE_URL
            },
            body: data
        });

        if (!response.ok) {
            return Promise.reject(Error(`HTTP error! Status: ${response.status}`));
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // rethrow the error to be caught by the caller
    }
}

export {updateTeamMembers}