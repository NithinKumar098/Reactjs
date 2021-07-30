const calculate_age = (dob1) => {
    let today = new Date();
    let birthDate = new Date(dob1);
    let age_now = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age_now--;
    }
    //console.log(age_now);
    return age_now;
  }

const users = [
    {
        id: 1,
        profilePic: "link",
        name: "Test User",
        email: "test@test.com",
        password: "test",
        DOB:'01/31/1990',
        
    }]

users.map(user => user.age = calculate_age(user.DOB) )

export  {users};