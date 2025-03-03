import { Injectable } from '../../node_modules/@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddFriendDto } from './dto/AddFriendDto';
import { DeleteFriendDto } from './dto/DeleteFriendDto';
import { UpdateUserProfileEmailDto } from './dto/UpdateUserProfile/UpdateUserProfileEmailDto';
import { UpdateUserProfileLoginDto } from './dto/UpdateUserProfile/UpdateUserProfileLoginDto';
import { UpdateUserProfilePasswordDto } from './dto/UpdateUserProfile/UpdateUserProfilePasswordDto';
import { UpdateUserProfileBioDto } from './dto/UpdateUserProfile/UpdateUserProfileBioDto';
import { UpdateUserProfileCoinDto } from './dto/UpdateUserProfile/UpdateUserProfileCoinDto';
import { UpdateUserProfileScoreDto } from './dto/UpdateUserProfile/UpdateUserProfileScoreDto';
import { UpdateUserProfileListEmojiDto } from './dto/UpdateUserProfile/UpdateUserProfileListEmojiDto';
import { UpdateUserProfilePictureDto } from './dto/UpdateUserProfile/UpdateUserProfilePictureDto';
import { ResponseUserProfile } from './Response/ResponseUserProfile';
import { ResponseUserUpdateEmail } from './Response/ResponseUpdate/ReponseUserUpdateEmail';
import { ResponseUserUpdateLogin } from './Response/ResponseUpdate/ResponseUserUpdateLogin';
import { ResponseUserUpdatePassword } from './Response/ResponseUpdate/ResponseUserUpdatePassword';
import { ResponseUserUpdateScore } from './Response/ResponseUpdate/ResponseUserUpdateScore';
import { ResponseUserUpdateProfilePicture } from './Response/ResponseUpdate/ResponseUserUpdateProfilePicture';
import { ResponseUserUpdateBio } from './Response/ResponseUpdate/ResponseUserUpdateBio';
import { ResponseUserUpdateCoin } from './Response/ResponseUpdate/ResponseUserUpdateCoin';
import { ResponseUserUpdateListEmoji } from './Response/ResponseUpdate/ResponseUserUpdateListEmoji';
import { ResponseScoreBoardOfAllUser } from './Response/ResponseScoreBoardOfAllUser';
import {
  ResponseScoreBoardMyfriend,
  ScoreBoardOfMyFriend,
} from './Response/ResponseScoreBoardMyFriend';
import { ResponseAddFriend } from './Response/ResponseAddFriend';
import * as bcrypt from 'bcrypt';
import { ResponseDeleteFriend } from './Response/ResponseDeleteFriend';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUserProfile(login: string): Promise<ResponseUserProfile> {
    let res: ResponseUserProfile;
    try {
      // Vérifier si l'utilisateur existe dans la base de donnée
      const user = await this.prismaService.user.findUnique({
        where: { login: login },
      });

      if (!user) {
        return (res = {
          status: 404,
          userProfile: null,
          error: 'Aucun utilisateur avec ce login',
        });
      }

      // Récuperer le profil
      const userProfile = await this.prismaService.user.findUnique({
        where: { login: login },
        select: {
          email: true,
          login: true,
          bio: true,
          createAt: true,
          listEmoji: true,
          coin: true,
          score: true,
          profilePicture: true,
          hasFriend: {
            select: {
              hasFriendLogin: true,
            },
          },
        },
      });

      // Requête pour récupérer toutes les parties
      const totalGamePlayed = await this.prismaService.userGame.findMany({
        where: { userLogin: login },
      });

      // Requête pour récupérer les parties gagnées
      const totalGameWon = await this.prismaService.userGame.findMany({
        where: { userLogin: login, rankInGame: 1 },
      });

      // Requête pour récupérer les parties perdues
      const totalGamelost = await this.prismaService.userGame.findMany({
        where: { userLogin: login, rankInGame: { not: 1 } },
      });

      const statsUserGame = {
        nbTotalGamePlayed: totalGamePlayed.length,
        nbTotalGameWon: totalGameWon.length,
        nbTotalGameLost: totalGamelost.length,
      };

      // Union des deux
      let UnionUserProfileStatsUserGame = { ...statsUserGame, ...userProfile };

      return (res = {
        status: 200,
        userProfile: UnionUserProfileStatsUserGame,
        error: null,
      });
    } catch (e) {
      return (res = {
        status: 400,
        userProfile: null,
        error: e,
      });
    }
  }

  async updateUserProfileEmail(
    updateUserProfileEmailDto: UpdateUserProfileEmailDto,
  ): Promise<ResponseUserUpdateEmail> {
    const { login, newEmail } = updateUserProfileEmailDto;
    let res: ResponseUserUpdateEmail;

    // Verifier si l'utilisateur existe dans la base de données
    try {
      const user = await this.prismaService.user.findUnique({
        where: { login: login },
      });
      if (!user) {
        return (res = {
          status: 404,
          error: 'aucun utilisateur ne possède ce login',
        });
      }

      const isNewEmailAlreadyExist = await this.prismaService.user.findUnique({
        where: { email: newEmail },
      });

      if (isNewEmailAlreadyExist) {
        return (res = {
          status: 'P2002',
          error: 'email déjà utilisé',
        });
      }

      // Mise à jour de l'email
      await this.prismaService.user.update({
        where: { login: login },
        data: { email: newEmail },
      });
      return (res = { status: 200, error: null });
    } catch (e) {
      return (res = {
        status: 400,
        error: e,
      });
    }
  }

  async updateUserProfileLogin(
    updateUserProfileLoginDto: UpdateUserProfileLoginDto,
  ): Promise<ResponseUserUpdateLogin> {
    const { login, newLogin } = updateUserProfileLoginDto;
    let res: ResponseUserUpdateLogin;

    // Verifier si l'utilisateur existe dans la base de données
    try {
      const user = await this.prismaService.user.findUnique({
        where: { login: login },
      });
      if (!user) {
        return (res = {
          status: 404,
          error: 'aucun utilisateur ne possède ce login',
        });
      }

      const isNewLoginAlreadyExist = await this.prismaService.user.findUnique({
        where: { login: newLogin },
      });

      if (isNewLoginAlreadyExist) {
        return (res = {
          status: 'P2002',
          error: 'login déjà utilisé',
        });
      }
      // Mise à jour du login
      await this.prismaService.user.update({
        where: { login: login },
        data: { login: newLogin },
      });
      return (res = { status: 200, error: null });
    } catch (e) {
      return (res = {
        status: 400,
        error: e,
      });
    }
  }

  async updateUserProfilePassword(
    updateUserProfilePasswordDto: UpdateUserProfilePasswordDto,
  ): Promise<ResponseUserUpdatePassword> {
    const { login, newPassword } = updateUserProfilePasswordDto;
    let res: ResponseUserUpdatePassword;

    // Verifier si l'utilisateur existe dans la base de données
    try {
      const user = await this.prismaService.user.findUnique({
        where: { login: login },
      });
      if (!user) {
        return (res = {
          status: 404,
          error: 'aucun utilisateur ne possède ce login',
        });
      }

      // hasher le nouveau mot de passe
      const hash = await bcrypt.hash(newPassword, 10);

      // Mise à jour du mot de passe
      await this.prismaService.user.update({
        where: { login: login },
        data: { password: hash },
      });
      return (res = { status: 200, error: null });
    } catch (e) {
      return (res = {
        status: 400,
        error: e,
      });
    }
  }

  async updateUserProfileScore(
    updateUserProfileScoreDto: UpdateUserProfileScoreDto,
  ): Promise<ResponseUserUpdateScore> {
    const { login, newScore } = updateUserProfileScoreDto;
    let res: ResponseUserUpdateScore;

    // Verifier si l'utilisateur existe dans la base de données
    try {
      const user = await this.prismaService.user.findUnique({
        where: { login: login },
      });
      if (!user) {
        return (res = {
          status: 404,
          error: 'aucun utilisateur ne possède ce login',
        });
      }
      // Mise à jour du score
      await this.prismaService.user.update({
        where: { login: login },
        data: { score: newScore },
      });
      return (res = { status: 200, error: null });
    } catch (e) {
      return (res = {
        status: 400,
        error: e,
      });
    }
  }

  async updateUserProfilePicture(
    updateUserProfilePictureDto: UpdateUserProfilePictureDto,
  ): Promise<ResponseUserUpdateProfilePicture> {
    const { login, newProfilePicture } = updateUserProfilePictureDto;
    let res: ResponseUserUpdateProfilePicture;

    // Verifier si l'utilisateur existe dans la base de données
    try {
      const user = await this.prismaService.user.findUnique({
        where: { login: login },
      });
      if (!user) {
        return (res = {
          status: 404,
          error: 'aucun utilisateur ne possède ce login',
        });
      }
      // Mise à jour de la photo de profil
      await this.prismaService.user.update({
        where: { login: login },
        data: { profilePicture: newProfilePicture },
      });
      return (res = { status: 200, error: null });
    } catch (e) {
      return (res = {
        status: 400,
        error: e,
      });
    }
  }

  async updateUserProfileBio(
    updateUserProfileBioDto: UpdateUserProfileBioDto,
  ): Promise<ResponseUserUpdateBio> {
    const { login, newBio } = updateUserProfileBioDto;
    let res: ResponseUserUpdateBio;

    // Verifier si l'utilisateur existe dans la base de données
    try {
      const user = await this.prismaService.user.findUnique({
        where: { login: login },
      });
      if (!user) {
        return (res = {
          status: 404,
          error: 'aucun utilisateur ne possède ce login',
        });
      }
      // Mise à jour de la bio
      await this.prismaService.user.update({
        where: { login: login },
        data: { bio: newBio },
      });
      return (res = { status: 200, error: null });
    } catch (e) {
      return (res = {
        status: 400,
        error: e,
      });
    }
  }

  async updateUserProfileCoin(
    updateUserProfileCoinDto: UpdateUserProfileCoinDto,
  ): Promise<ResponseUserUpdateCoin> {
    const { login, newCoin } = updateUserProfileCoinDto;
    let res: ResponseUserUpdateCoin;

    // Verifier si l'utilisateur existe dans la base de données
    try {
      const user = await this.prismaService.user.findUnique({
        where: { login: login },
      });
      if (!user) {
        return (res = {
          status: 404,
          error: 'aucun utilisateur ne possède ce login',
        });
      }
      // mise à jour de l'argent
      await this.prismaService.user.update({
        where: { login: login },
        data: { coin: newCoin },
      });
      return (res = { status: 200, error: null });
    } catch (e) {
      return (res = {
        status: 400,
        error: e,
      });
    }
  }

  async updateUserProfileListEmoji(
    updateUserProfileListEmojiDto: UpdateUserProfileListEmojiDto,
  ): Promise<ResponseUserUpdateListEmoji> {
    const { login, newListEmoji } = updateUserProfileListEmojiDto;
    let res: ResponseUserUpdateListEmoji;

    // Verifier si l'utilisateur existe dans la base de données
    try {
      const user = await this.prismaService.user.findUnique({
        where: { login: login },
      });
      if (!user) {
        return (res = {
          status: 404,
          error: 'aucun utilisateur ne possède ce login',
        });
      }
      // Mise à jour de la liste d'emoji
      await this.prismaService.user.update({
        where: { login: login },
        data: { listEmoji: newListEmoji },
      });
      return (res = { status: 200, error: null });
    } catch (e) {
      return (res = {
        status: 400,
        error: e,
      });
    }
  }

  async getScoreBoardOfAllUser(): Promise<ResponseScoreBoardOfAllUser> {
    let res: ResponseScoreBoardOfAllUser;
    try {
      const scoreBoard = await this.prismaService.user.findMany({
        take: 10,
        orderBy: [
          {
            score: 'desc',
          },
        ],
        select: {
          login: true,
          score: true,
        },
      });
      return (res = {
        status: 200,
        error: null,
        scoreBoard: scoreBoard,
      });
    } catch (e) {
      return (res = {
        status: 400,
        error: e,
        scoreBoard: null,
      });
    }
  }

  async getScoreBoardMyFriend(
    login: string,
  ): Promise<ResponseScoreBoardMyfriend> {
    let res: ResponseScoreBoardMyfriend;
    let scoreBoard: ScoreBoardOfMyFriend = [];

    // Verifier si l'utilisateur existe dans la base de données
    try {
      const user = await this.prismaService.user.findUnique({
        where: { login: login },
      });
      if (!user) {
        return (res = {
          status: 404,
          scoreBoard: null,
          error: 'aucun utilisateur ne possède ce login',
        });
      }
      // récupérer les amis
      const friends = await this.prismaService.friend.findMany({
        where: { isFriendOfLogin: login },
        select: {
          hasFriendLogin: true,
        },
      });
      // Récupérer le profil de l'ami
      for (const friend of friends) {
        const friendScore = await this.prismaService.user.findUnique({
          where: { login: friend.hasFriendLogin },
          select: {
            login: true,
            score: true,
          },
        });
        // Ajout des amis
        scoreBoard.push(friendScore);
      }

      // Trier le score board
      scoreBoard.sort((a, b) => b.score - a.score);
      return (res = {
        status: 200,
        error: null,
        scoreBoard: scoreBoard,
      });
    } catch (e) {
      return (res = {
        status: 400,
        scoreBoard: null,
        error: e,
      });
    }
  }

  async addFriend(addFriendDto: AddFriendDto): Promise<ResponseAddFriend> {
    const { login, friendLogin } = addFriendDto;
    let res: ResponseAddFriend;
    // Verifier si l'utilisateur existe dans la base de données
    try {
      const user = await this.prismaService.user.findUnique({
        where: { login: login },
      });
      if (!user) {
        return (res = {
          status: 404,
          error: 'aucun utilisateur ne possède ce login',
        });
      }

      // Vérifier si l'utilisateur que l'on essaye d'ajouter existe dans la base de données
      const friend = await this.prismaService.user.findUnique({
        where: { login: friendLogin },
      });
      if (!friend) {
        return (res = {
          status: 404,
          error: 'utilisateur que l on veut ajouter n existe pas',
        });
      }

      // Ajout de l'ami
      await this.prismaService.friend.create({
        data: {
          isFriendOfLogin: login,
          hasFriendLogin: friendLogin,
        },
      });
      return { status: 201, error: null };
    } catch (e) {
      return (res = {
        status: 400,
        error: e,
      });
    }
  }

  async deleteFriend(
    deleteFriendDto: DeleteFriendDto,
  ): Promise<ResponseDeleteFriend> {
    const { login, friendLogin } = deleteFriendDto;
    let res: ResponseDeleteFriend;

    // Verifier si l'utilisateur existe dans la base de données
    try {
      const user = await this.prismaService.user.findUnique({
        where: { login: login },
      });
      if (!user) {
        return (res = {
          status: 404,
          error: 'aucun utilisateur ne possède ce login',
        });
      }

      // Vérifier si l'utilisateur que l'on essaye d'ajouter existe dans la base de données
      const friend = await this.prismaService.user.findUnique({
        where: { login: friendLogin },
      });
      if (!friend) {
        return (res = {
          status: 404,
          error: 'utilisateur que l on veut ajouter n existe pas',
        });
      }

      // Suppression de l'ami
      await this.prismaService.friend.delete({
        where: {
          id: {
            isFriendOfLogin: login,
            hasFriendLogin: friendLogin,
          },
        },
      });
      return (res = { status: 200, error: null });
    } catch (e) {
      return (res = {
        status: 400,
        error: e,
      });
    }
  }
}
