const createUserPanel = element => user => {
  element.innerHTML = user ?
      `<img width="40px" src="${user.picture}" /><span>Hi ${user.nickname}</span><button onclick=actions.logout()>logout</button>` :
      `<button onclick=actions.login()>login</button>`;
};

module.exports = createUserPanel;
