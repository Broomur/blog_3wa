import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Owner } from '../owner/owner.model';
import { Comment } from '../comment/comment.model';

@Entity('users')
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		type: 'varchar',
		length: 40,
		nullable: false,
		unique: true,
	})
	nickname: string;

	@Column({
		type: 'varchar',
		length: 50,
		nullable: false,
		unique: true
	})
	mail: string;

	@Column({
		type: 'varchar',
		length: 250,
		nullable: false
	})
	password: string;

	@CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
	public created_at: Date;

	@UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
	public updated_at: Date;

	@OneToOne(() => Owner, (owner) => owner.user)
	owner: Owner;

	@OneToMany(() => Comment, (comment) => comment.user)
	comments: Comment[];
}
