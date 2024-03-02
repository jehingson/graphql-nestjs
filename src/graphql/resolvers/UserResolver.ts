import {
  Resolver,
  Query,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { User } from '../models/User';
import { mockUsers } from 'src/__mocks__/mocksUser';
import { UserSetting } from '../models/UserSetting';
import { mockUserSetting } from 'src/__mocks__/mockUserSetting';

@Resolver((of) => User)
export class UserResover {
  @Query(() => User, { nullable: true })
  getUserById(@Args('id', { type: () => Int }) id: number) {
    return mockUsers.find((user) => user.id === id);
  }

  @Query(() => [User])
  getUsers() {
    return mockUsers;
  }

  @ResolveField((returns) => UserSetting, { name: 'settings', nullable: true })
  getUsesSetting(@Parent() user: User) {
    return mockUserSetting.find((setting) => setting.userId === user.id);
  }
}
