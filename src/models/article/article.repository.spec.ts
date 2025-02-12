import { Repository } from "typeorm";
import { Article, Owner } from "@project/entities";
import { TestHelper } from "../../__test__/test_helper";
import { ArticleRepositoryInterface } from "./article.repository.interface";
import { ArticleRepository } from "./article.repository";
import { mockDeep } from 'jest-mock-extended';

describe('ArticleRepository tests', () => {
	let repository: ArticleRepositoryInterface;
	let mockRepository: Repository<Article>;

	const createQueryBuilder: any = {
		where: () => createQueryBuilder,
		getOne: () => createQueryBuilder,
	};

	beforeAll(async () => {
		await TestHelper.instance.setupTestDB();
	});

	afterAll(async () => {
		await TestHelper.instance.teardownTestDB();
	});

	beforeEach(() => {
		mockRepository = TestHelper.instance.getRepo('Article') as Repository<Article>;
		repository = new ArticleRepository(mockRepository)
	});

	describe('create', () => {
		it('should create a new article', async () => {
			const mockTitle = 'test_title';
			const mockContent = 'test_content';
			const mockUser = await TestHelper.instance.getRepo('User').save({
				nickname: 'test',
				mail: 'test@test.io',
				password: 'test1234'
			})
			const mockOwner = await TestHelper.instance.getRepo('Owner').save({
				id: mockUser.id
			});
			const mockArticle = mockDeep<Article>();

			jest.spyOn(mockRepository, 'save').mockResolvedValueOnce(mockArticle);

			await repository.create(mockTitle, mockContent, mockOwner.id);

			expect(mockRepository.save).toHaveBeenCalled();
		})
	})
})