import { Controller, Get, Param, UseGuards, Body, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../../node_modules/@nestjs/passport';
import { AddFriendDto } from './dto/AddFriendDto';
import { DeleteFriendDto } from './dto/DeleteFriendDto';
import { UpdateUserProfileEmailDto } from './dto/UpdateUserProfile/UpdateUserProfileEmailDto';
import { UpdateUserProfileLoginDto } from './dto/UpdateUserProfile/UpdateUserProfileLoginDto';
import { UpdateUserProfilePasswordDto } from './dto/UpdateUserProfile/UpdateUserProfilePasswordDto';
import { UpdateUserProfileBioDto } from './dto/UpdateUserProfile/UpdateUserProfileBioDto';
import { UpdateUserProfileScoreDto } from './dto/UpdateUserProfile/UpdateUserProfileScoreDto';
import { UpdateUserProfileCoinDto } from './dto/UpdateUserProfile/UpdateUserProfileCoinDto';
import { UpdateUserProfilePictureDto } from './dto/UpdateUserProfile/UpdateUserProfilePictureDto';
import { UpdateUserProfileListEmojiDto } from './dto/UpdateUserProfile/UpdateUserProfileListEmojiDto';
import { ResponseUserProfile } from './Response/ResponseUserProfile';
import { ResponseUserUpdateEmail } from './Response/ResponseUpdate/ReponseUserUpdateEmail';
import { ResponseUserUpdateLogin } from './Response/ResponseUpdate/ResponseUserUpdateLogin';
import { ResponseUserUpdatePassword } from './Response/ResponseUpdate/ResponseUserUpdatePassword';
import { ResponseUserUpdateListEmoji } from './Response/ResponseUpdate/ResponseUserUpdateListEmoji';
import { ResponseUserUpdateProfilePicture } from './Response/ResponseUpdate/ResponseUserUpdateProfilePicture';
import { ResponseUserUpdateCoin } from './Response/ResponseUpdate/ResponseUserUpdateCoin';
import { ResponseUserUpdateScore } from './Response/ResponseUpdate/ResponseUserUpdateScore';
import { ResponseUserUpdateBio } from './Response/ResponseUpdate/ResponseUserUpdateBio';
import { ResponseScoreBoardOfAllUser } from './Response/ResponseScoreBoardOfAllUser';
import { ResponseScoreBoardMyfriend } from './Response/ResponseScoreBoardMyFriend';
import { ResponseAddFriend } from './Response/ResponseAddFriend';
import { ResponseDeleteFriend } from './Response/ResponseDeleteFriend';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  /**
   * Permet de renvoyer le profil d'un utilisateur 
   * @param login - Le client doit mettre en paramètre de GET le login de l'utilisateur
   * @returns Promise<ResponseUserProfile> - L'API renvoit un json avec les attributs : status (code http), userProfile et error (s'il y en a une)
   */
  @Get('profile/:login')
  getUserProfile(@Param('login') login: string) : Promise<ResponseUserProfile> {
    return this.userService.getUserProfile(login);
  }

  /**
   * Permet changer l'email d'un utilisateur
   * @param updateUserProfileEmailDto - Le client doit envoyer un json contenant les attributs: login et newEmail
   * @returns Promise<ResponseUpdateEmail> - L'API renvoit un json avec les attributs : status (code http) et error (s'il y en a)
   */
  @UseGuards(AuthGuard('jwt'))
  @Post('update/email/')
  updateUserProfileEmail(
    @Body() updateUserProfileEmailDto: UpdateUserProfileEmailDto,
  ) : Promise<ResponseUserUpdateEmail>{
    return this.userService.updateUserProfileEmail(updateUserProfileEmailDto);
  }

  /**
   * Permet changer le login d'un utilisateur
   * @param updateUserProfileEmailDto - Le client doit envoyer un json contenant les attributs: login et newLogin
   * @returns Promise<ResponseUpdateLogin> - L'API renvoit un json avec les attributs : status (code http) et error (s'il y en a)
   */
  @UseGuards(AuthGuard('jwt'))
  @Post('update/login/')
  updateUserProfileLogin(
    @Body() updateUserProfileLoginDto: UpdateUserProfileLoginDto,
  ) : Promise<ResponseUserUpdateLogin> {
    return this.userService.updateUserProfileLogin(updateUserProfileLoginDto);
  }

  /**
   * Permet changer le mot de passe d'un utilisateur
   * @param updateUserProfileEmailDto - Le client doit envoyer un json contenant les attributs: login et newPassword
   * @returns Promise<ResponseUpdateLogin> - L'API renvoit un json avec les attributs : status (code http) et error (s'il y en a)
   */
  @UseGuards(AuthGuard('jwt'))
  @Post('update/password/')
  updateUserProfilePassword(
    @Body() updateUserProfilePasswordDto: UpdateUserProfilePasswordDto,
  ) : Promise<ResponseUserUpdatePassword>{
    return this.userService.updateUserProfilePassword(
      updateUserProfilePasswordDto,
    );
  }

  /**
   * Permet changer la bio d'un utilisateur
   * @param updateUserProfileBioDto - Le client doit envoyer un json contenant les attributs: login et newBio
   * @returns Promise<ResponseUserUpdateBio> - L'API renvoit un json avec les attributs : status (code http) et error (s'il y en a)
   */
  @UseGuards(AuthGuard('jwt'))
  @Post('update/bio/')
  updateUserProfileBio(
    @Body() updateUserProfileBioDto: UpdateUserProfileBioDto,
  ) : Promise<ResponseUserUpdateBio>{
    return this.userService.updateUserProfileBio(updateUserProfileBioDto);
  }

  /**
   * Permet changer le score
   * @param updateUserProfileScoreDto - Le client doit envoyer un json contenant les attributs: login et newScore
   * @returns Promise<ResponseUserUpdateScore> - L'API renvoit un json avec les attributs : status (code http) et error (s'il y en a)
   */
  @UseGuards(AuthGuard('jwt'))
  @Post('update/score/')
  updateUserProfileScore(
    @Body() updateUserProfileScoreDto: UpdateUserProfileScoreDto,
  ) : Promise<ResponseUserUpdateScore>{
    return this.userService.updateUserProfileScore(updateUserProfileScoreDto);
  }

  /**
   * Permet changer l'argent d'un utilisateur
   * @param updateUserProfileCoinDto - Le client doit envoyer un json contenant les attributs: login et newCoin
   * @returns Promise<ResponseUserUpdateCoin> - L'API renvoit un json avec les attributs : status (code http) et error (s'il y en a)
   */
  @UseGuards(AuthGuard('jwt'))
  @Post('update/coin/')
  updateUserProfileCoin(
    @Body() updateUserProfileCoinDto: UpdateUserProfileCoinDto,
  ) : Promise<ResponseUserUpdateCoin>{
    return this.userService.updateUserProfileCoin(updateUserProfileCoinDto);
  }

  /**
   * Permet changer la photo de profil d'un utilisateur
   * @param updateUserProfilePictureDto - Le client doit envoyer un json contenant les attributs: login et newProfilePictue
   * @returns Promise<ResponseUserUpdateProfilePicture> - L'API renvoit un json avec les attributs : status (code http) et error (s'il y en a)
   */
  @UseGuards(AuthGuard('jwt'))
  @Post('update/profile-picture/')
  updateUserProfilePicture(
    @Body() updateUserProfilePictureDto: UpdateUserProfilePictureDto,
  ) : Promise<ResponseUserUpdateProfilePicture>{
    return this.userService.updateUserProfilePicture(
      updateUserProfilePictureDto,
    );
  }

  /**
   * Permet changer le mot de passe de la liste d'emoji de l'utilisateur
   * @param updateUserProfileListEmojiDto - Le client doit envoyer un json contenant les attributs: login et newListEmoji
   * @returns Promise<ResponseUserUpdateListEmoji> - L'API renvoit un json avec les attributs : status (code http) et error (s'il y en a)
   */
  @UseGuards(AuthGuard('jwt'))
  @Post('update/list-emoji/')
  updateUserProfileListEmoji(
    @Body() updateUserProfileListEmojiDto: UpdateUserProfileListEmojiDto,
  ) : Promise<ResponseUserUpdateListEmoji>{
    return this.userService.updateUserProfileListEmoji(
      updateUserProfileListEmojiDto,
    );
  }

  /**
   * Permet récupérer le tableau de score des 10 premmiers joueurs
   * @returns Promise<ResponseScoreBoardOfAllUser> - L'API renvoit un json avec les attributs : status (code http), error (s'il y en a) et scoreBoard
   */
  @Get('score-board')
  getScoreBoard() : Promise<ResponseScoreBoardOfAllUser>{
    return this.userService.getScoreBoardOfAllUser();
  }

  /**
   * Permet récupérer le tableau de score des amis
   * @param login - Le client doit mettre en paramètre de GET le login de l'utilisateur
   * @returns Promise<ResponseScoreBoardMyfriend> - L'API renvoit un json avec les attributs : status (code http), error (s'il y en a) et scoreBoard
   */
  @Get('/friend/score-board/:login')
  getScoreBoardMyFriend(@Param('login') login: string) : Promise<ResponseScoreBoardMyfriend>{
    return this.userService.getScoreBoardMyFriend(login);
  }

  /**
   * Permet d'ajouter un ami
   * @param addFriendDto - Le client doit envoyer un json avec les attributs : login et friendLogin
   * @returns Promise<ResponseAddFriend> - L'API renvoit un json avec les attributs : status (code http) et error (s'il y en a)
   */
  @UseGuards(AuthGuard('jwt'))
  @Post('/friend/add/')
  addFriend(@Body() addFriendDto: AddFriendDto) : Promise<ResponseAddFriend>{
    return this.userService.addFriend(addFriendDto);
  }

  /**
   * Permet de supprimer un ami
   * @param deleteFriendDto - Le client doit envoyer un json avec les attributs : login et friendLogin
   * @returns Promise<ResponseDeleteFriend> - L'API renvoit un json avec les attributs : status (code http) et error (s'il y en a)
   */
  @UseGuards(AuthGuard('jwt'))
  @Post('/friend/delete/')
  deleteFriend(@Body() deleteFriendDto: DeleteFriendDto) : Promise<ResponseDeleteFriend>{
    return this.userService.deleteFriend(deleteFriendDto);
  }
}
