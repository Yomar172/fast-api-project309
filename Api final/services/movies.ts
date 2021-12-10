import Store from '../lib/mongodb';

class MoviesService {
  private _store: Store;
  private _collection: string;

  constructor() {
    this._collection = 'movies';
    this._store = new Store();
  }

  async getMovies(tags: string[]) {
    const query: object = tags && { tags: { $in: tags } };
    const movies = await this._store.getAll(this._collection, query);
    return movies || [];
  }

  async getMovie(id: string) {
    const movie = await this._store.get(this._collection, id);
    return movie || {};
  }

  async createMovie(data: object) {
    const movie = await this._store.create(this._collection, data);
    return movie || {};
  }

  async updateMovie(id: string, data: object) {
    const movie = await this._store.update(this._collection, id, data);
    return movie || {};
  }

  async deleteMovie(id: string) {
    const movie = await this._store.remove(this._collection, id);
    return movie || {};
  }
}

export default MoviesService;
