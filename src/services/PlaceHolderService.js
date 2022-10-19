async function getUsers() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");

  if (!response.ok) {
    throw new Error(`Could not fetch https://jsonplaceholder.typicode.com/users, status: ${response.status}`);
  }

  const result = await response.json();

  return result.map(_transformUser);
}

function _transformUser(user){
  return {
    id: user.id,
    name: user.name,
    username: user.username,
    phone: user.phone,
    email: user.email,
    city: user.address.city,
    address: `${user.address.street} ${user.address.suite}`,
    website: user.website,
    zipcode: user.address.zipcode
  }
}

export {getUsers};