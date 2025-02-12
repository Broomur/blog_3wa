import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany, JoinColumn, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import { Owner } from '../owner/owner.model';
import { Comment } from '../comment/comment.model';


@Entity('articles')
export class Article extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		type: 'varchar',
		length: 50
	})
	title: string;

	@Column({
		type: 'text'
	})
	content: string;

	@CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
	public created_at: Date;

	@UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
	public updated_at: Date;

	@Column({ type: 'int', nullable: true })
	owner_id: number

	@ManyToOne(() => Owner, (owner) => owner.articles)
	@JoinColumn({
		name: 'owner_id'
	})
	owner: Owner;

	@OneToMany(() => Comment, (comment) => comment.article)
	comments: Comment[];
};
