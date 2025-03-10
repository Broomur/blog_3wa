import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { Article } from "./article.entity";

@Entity('comments')
export class Comment extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		type: 'text',
		nullable: false
	})
	content: string;

	@CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
	public created_at: Date;

	@UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
	public updated_at: Date;

	@Column({ type: 'int', nullable: true })
	user_id: number;

	@ManyToOne(() => User, (user) => user.comments, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE'
	})
	@JoinColumn({
		name: 'user_id'
	})
	user: User;

	@Column({ type: 'int', nullable: true })
	article_id: number;

	@ManyToOne(() => Article, (article) => article.comments, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE'
	})
	@JoinColumn({
		name: 'article_id'
	})
	article: Article;
}
