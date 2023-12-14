import { Challenge } from 'src/entities/challenge.entity';
import { Like } from 'src/entities/like.entity';
import { User } from 'src/entities/user.entity';
import { Comment } from 'src/entities/comment.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ schema: 'outbody', name: 'posts' })
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
    nullable: false,
  })
  challengeId: number;

  @Column({
    type: 'int',
    nullable: false,
  })
  userId: number;

  @Column('varchar')
  description: string;

  @Column('varchar', { nullable: true })
  imgUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  // Post : Like = 1:N
  @OneToMany(() => Like, (like) => like.post)
  like: Like[];

  // Post : Comment = 1:N
  @OneToMany(() => Comment, (comments) => comments.post, {
    cascade: true,
  })
  comments: Comment[];

  // Post: Challenges = N:1
  @ManyToOne(() => Challenge, (challenges) => challenges.post, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'challengeId' })
  challenges: Challenge;

  // Post : User : N:1
  @ManyToOne(() => User, (user) => user.post)
  @JoinColumn({ name: 'userId' })
  user: User;
}
