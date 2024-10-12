export const ExtractDetails=(email:string)=> {
    // Regular expression to match the email format
    const regex = /^(.*?)\.(\w{2})(\d{2})(\w{3})@(\w+)\.edu\.in$/;
    const match = email.match(regex);

    if (match) {
        const username = match[1]; // Before the first dot
        const degreeCode = match[2]; // bt or mt
        const joiningYear = `20${match[3]}`; // Joining year (e.g., 2021)
        const branch = match[4]; // Branch (e.g., cse)
        const college = match[5]; // College (e.g., pec)

        return {
            username,
            degree: degreeCode === 'bt' ? 'BTech' : 'MTech',
            joiningYear,
            branch,
            college,
        };
    }

    return null; // Return null if the email doesn't match the expected format
}
