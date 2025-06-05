import {
    Injectable,
    Inject,
    NotFoundException,
  } from '@nestjs/common';
  import { IUserRepository } from '../../domain/repositories/user.repository';
  import { GetUserByIdDto } from '../../application/dtos/response/get-user-by-id.dto';
  
  @Injectable()
  export class UserService {
    constructor(
      @Inject(IUserRepository)
      private readonly userRepository: IUserRepository,
    ) {}
  
    async getuserbyid(userid: string): Promise<GetUserByIdDto> {
      const user = await this.userRepository.findById(userid);
  
      if (!user) {
        throw new NotFoundException('User not found');
      }
  
      const res = new GetUserByIdDto();
      res.user_id = user.user_id;
      res.email = user.email;
      res.phone = user.phone;
      res.full_name = user.full_name;
  
      return res;
    }
  }
  