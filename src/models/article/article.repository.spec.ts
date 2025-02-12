import Article from "./article.model"
import ArticleRepository from "./article.repository"

describe('ArticleRepository', () => {
	jest.mock("./Article");

	beforeEach(() => {
		jest.resetAllMocks();
	})

	it("should create a new Article", async () => {
		const article = await ArticleRepository.create('test_title', 'test_content', 1);
		expect(Article).toHaveBeenCalledWith(expect.objectContaining({
			title: 'test_title',
			content: 'test_content',
			owner_id: 1
		}));
	});
});