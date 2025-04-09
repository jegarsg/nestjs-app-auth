// src/modules/auth/domain/repositories/user.repository.ts

import { User } from '../entities/user.entity';

/**
 * Runtime token for dependency injection.
 */
export const IUserRepository = Symbol('IUserRepository');

export interface IUserRepository {
    findByEmail(email: string): Promise<User | null>;
    findByPhone(phone: string): Promise<User | null>;
    save(user: User): Promise<User>;
  }
