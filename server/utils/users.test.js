const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: 1,
      name: 'John',
      room: 'Node Course'
    }, {
      id: 2,
      name: 'Alex',
      room: 'Python Course'
    },{
      id: 3,
      name: 'Matt',
      room: 'Java Course'
    }]
  });

  it('should add new user', () => {
    var users = new Users();

    var user = {
      id: '123',
      name: 'Dhantha',
      room: 'This is test group'
    };
    var resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it('should return names for node courses', () => {
    var userList = users.getUserList('Node Course');

    expect(userList).toEqual(['John']);
  })

  it('should remove a user', () => {
    var userID = 1;
    var user = users.removeUser(userID);

    expect(user.id).toBe(userID);
    expect(users.users.length).toBe(2);

  });

  it('should not remove a user', () => {
    var userID = 5;
    var user = users.removeUser(userID);

    expect(user.id).toNotExist();
    expect(users.users.length).toBe(3);
  });

  it('should find user', () => {
    var userID = 1
    var user = users.getUser(userID);

    expect(users).toBe(userID);
  });

  it('should not find user', () => {
    var userID = 5;
    var users = users.getUser(userID);

    expect(users).toNotExist();
  });
});
