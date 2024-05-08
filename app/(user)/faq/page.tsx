import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { rules } from "@/constants";
import Link from "next/link";

export default function FaqPage() {
  return (
    <main className="flex justify-center items-center mt-5 max-w-[1000px] m-auto">
      <Tabs defaultValue="info" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="info">Info</TabsTrigger>
          <TabsTrigger value="rule">Rules</TabsTrigger>
          <TabsTrigger value="how-to-use">How to use</TabsTrigger>
        </TabsList>
        <TabsContent value="info">
          <Card>
            <CardHeader>
              <CardTitle>Info</CardTitle>
              <CardDescription>
                Này chịu không tiếng anh được =))
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>
                Mục đích em nó sinh ra chỉ để lưu giữ kỉ niệm nên các bạn cố
                gắng giữ gìn nơi này của chúng ta nhé, tất cả các ảnh của các
                bạn khi đăng lên mình sẽ lưu vào google drive nhe hjhj
              </p>
              <p>Vì kinh phí có hạn nên các bạn nên đăng ảnh không nên trùng nhau nhé</p>
              <p className="font-bold">Trong trường hợp xảy ra lỗi gì vui lòng liên hệ mình, link ở dưới :)</p>
            </CardContent>
            <CardContent>
              <Link href="https://www.facebook.com/TuonNguyen1602/">
                <h2 className="text-blue-500">Link của mình ( chủ page )</h2>
              </Link>
            </CardContent>
            <CardFooter>
              <CardDescription>
                Hiện tại chỉ có thế này :) thôi, update sau
              </CardDescription>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="rule">
          <Card>
            <CardHeader>
              <CardTitle>Rules</CardTitle>
              <CardDescription>
                Này chịu không tiếng anh được =))
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <ul className="list-decimal ml-5">
                {rules.map((rule, index) => (
                  <li key={index}>{rule}</li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <CardDescription>
                Bạn nào mà cứ hư là mình đánh đít nhé :(
              </CardDescription>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="how-to-use">
          <Card>
            <CardHeader>
              <CardTitle>How to use</CardTitle>
              <CardDescription>
                Cách dùng trang web sao cho hiệu quả
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>Hiện tại chưa có gì</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
