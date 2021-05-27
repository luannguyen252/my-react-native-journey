export default class TODOModel {
  constructor(obj) {
    obj['id'] ? (this.id = obj['id']) : null;
    obj['title'] ? (this.title = obj['title']) : null;
    obj['content'] ? (this.content = obj['content']) : null;
    obj['created'] ? (this.created = obj['created']) : null;
    obj['completed'] !== null ? (this.completed = obj['completed']) : null;
    obj['due_date'] ? (this.due_date = obj['due_date']) : null;
    obj['owner'] ? (this.owner = obj['owner']) : null;
  }
}
