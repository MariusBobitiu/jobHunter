const bcrypt = require("bcrypt");
const { User } = require("../models/models");
const TokenService = require("./token-service");
require("dotenv").config();

class UserService {
  async registration(username, email, password) {
    const candidateUsername = await User.findOne({ where: { username } });
    if (candidateUsername) {
      throw new Error("User with this username already exists");
    }

    const candidateEmail = await UserService.findOne({ where: { email } });
    if (candidateEmail) {
      throw new Error("User with this email already exists");
    }

    const hashPassword = await bcrypt.hash(password, process.env.saltingRounds);
    const user = await User.create({ username, email, password: hashPassword });

    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });

    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async login(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("User with this email does not exist");
    }

    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      throw new Error("Wrong password");
    }

    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });

    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async checkAuth() {
    const user = await User.findOne({ where: { email } });
    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return tokens.accessTokens;
  }

  async refresh(refreshToken) {
    try {
      if (!refreshToken) {
        throw new Error("User is not authorized");
      }
      const userData = TokenService.validateRefreshToken(refreshToken);
      const tokenFromDb = await TokenService.findToken(refreshToken);

      if (!userData || !tokenFromDb) {
        throw new Error("User is not authorized");
      }

      const user = await User.findByPk(userData.id);
      const userDto = new UserDto(user);
      const tokens = TokenService.generateTokens({ ...userDto });
      await tokenService.saveToken(userDto.id, tokens.refreshToken);

      return {
        ...tokens,
        user: userDto,
      };
    } catch (error) {
      console.log("Error in refresh: ", error);
    }
  }
}

module.exports = new UserService();
