export const addUsertoLocalStorage = (user) =>{
    // console.log(user);
    localStorage.setItem('user',JSON.stringify(user));
};
export const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user');
} 
export const getUserFromLocalStorage = () => {
    const result =  localStorage.getItem('user');
    const user = result ? JSON.parse(result) : null;
    return user;
}