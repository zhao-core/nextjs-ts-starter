import { User, UserCache } from '../modal/user';

class HomeService {
  public static async sayHi(name: string) {
    return `hi, ${name}`;
  }

  public static async queryUser(name: string) {
    return await User.findAll({ where: { username: name }});
  }

   /***
   * 查询单个的用户
   * @注 查询，使用了缓存反而更慢了，原因不详
   */
  public static async queryOneUser() {
    const user = await UserCache.findAll({ where: { id: '91f65cb1-8e6b-445f-be25-143649910066' } });
    return [user, UserCache.cacheHit];
  }
  /***
   * 查询所有的用户
   * @注 查询，使用了缓存反而更慢了，原因不详
   */
  public static async queryAllUser() {
    const user = await UserCache.findAll();
    return [user, UserCache.cacheHit];
  }
}

export default HomeService;
