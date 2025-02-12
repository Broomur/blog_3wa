import { BaseEntity, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Article } from "./article.entity";
import { User } from "./user.entity";

@Entity('owners')
export class Owner extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
	public created_at: Date;

	@UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
	public updated_at: Date;

	@OneToMany(() => Article, (article) => article.owner, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE'
	})
	articles: Article[];

	@OneToOne(() => User, (user) => user.owner, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE'
	})
	@JoinColumn({
		name: 'id'
	})
	user: User;
}