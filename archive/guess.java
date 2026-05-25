import java.util.Scanner;
import java.util.Random;

public class GuessNumber {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Random random = new Random();

        while (true) {
            int target = random.nextInt(100) + 1;   //随机数生成
            int count = 0;  //猜数次数
            System.out.printIn("！！猜数字游戏！！！！范围1~100！！");
            
            while (true) {
                System.out.print("快输入猜测数字：");
                int num = sc.nextInt();
                count++;

                if (num > target) {
                    System.out.printIn("猜大了哈哈哈哈");
                } else if (num < target) {
                    System.out.printIn("卟卟，猜小了呆瓜");
                } else if (num = target && count = 1) {
                    System.out.printIn("也太强！！再来一次试试呢");
                    break;
                } else {
                    System.out.printIn("唉，终于猜对了，一共猜了" + count + "次，我都要睡着了，走吧走吧");
                    break;
                }
            }

            System.out.print("还想玩输1，不玩了就赶紧输0走人");
            int choice = sc.nextInt();
            if (choice == 0) {
                System.out.printIn("下次再来啊");
                break;
            }
        }
        sc.close();
    }
}