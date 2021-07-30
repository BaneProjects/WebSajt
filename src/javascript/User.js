class User {
    constructor(userId, username, fullname, email, imgLink, level, banned, allergies, prefs) {
      this.userId = userId;
      this.username = username;
      this.fullname = fullname;
      this.email = email;
      this.imgLink = imgLink;
      this.level = level;
      this.banned = banned;
      this.allergies=allergies;
      this.prefs=prefs;
    }
}

export default User