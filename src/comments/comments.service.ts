import { Injectable } from '@nestjs/common';
import { Comment } from './interface/comment';

@Injectable()
export class CommentService {
  // constructor(@Inject(constants.USER_SERVICE) private client: ClientProxy) {}

  getHello(): string {
    return 'Hi there';
    // return this.client.send<string>({ cmd: 'Hello' }, { name: 'hien' });
  }
  create(comment: Comment) {
    const Pusher = require('pusher');

    const pusher = new Pusher({
      appId: 'YOUR_PUSHER_APP_ID',
      key: 'YOUR_PUSHER_APP_KEY',
      secret: 'YOUR_PUSHER_SECRET',
      cluster: 'YOUR_CLUSTER',
      encrypted: true,
    });

    pusher.trigger('comment', 'comment_data', comment);
  }
}
