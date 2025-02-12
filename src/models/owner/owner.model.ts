import { BaseEntity, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Article } from "../article/article.model";
import { User } from "../user/user.model";

@Entity('owners')
export class Owner extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
	public created_at: Date;

	@UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
	public updated_at: Date;

	@OneToMany(() => Article, (article) => article.owner)
	articles: Article[];

	@OneToOne(() => User, (user) => user.owner)
	@JoinColumn({
		name: 'id'
	})
	user: User;
}