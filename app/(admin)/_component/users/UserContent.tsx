"use client";
import Image from "next/image";
import Link from "next/link";
import {
  File,
  Home,
  LineChart,
  ListFilter,
  MoreHorizontal,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Users2,
  LayoutDashboard,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import moment from "moment";
import { useRouter } from "next/navigation";
import AvatarDropdown from "../AvatarDropdown";
import AddUserForm from "./AddUserForm";
import { revalidateTag } from "next/cache";
import { toast } from "sonner";
import { FormEvent, useEffect, useState } from "react";
import clsx from "clsx";
import { User } from "@/types";
import MobileNav from "../MobileNav";
import EditUserForm from "./EditUserForm";

interface IProps {
  usersData: any;
  adminsData: User[];
  userFilterData: User[];
}

const UserContent = ({ usersData, adminsData, userFilterData }: IProps) => {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [searchData, setSearchData] = useState<User[]>([]);
  const handleFindUsers = async (event: FormEvent<HTMLInputElement>) => {
    const keyword = event.currentTarget.value;
    setSearchKeyword(keyword);
    if (keyword.length >= 3) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/search?query=${searchKeyword}`
      );
      const data = await res.json();
      if (data.result.length > 0) {
        setSearchData(data.result);
      } else {
        setSearchData([]);
      }
    } else {
      return;
    }
  };
  const handleConfirmDelete = async (id: number) => {
    if (confirm("Bạn có chắc là xóa user này không") == true) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user?id=${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (data.message === "Deleted") {
        toast.success("Deleted", {
          duration: 1500,
        });
        router.refresh();
      } else {
        toast.error("There was an error deleting");
      }
    } else {
      return null;
    }
  };
  const router = useRouter();
  return (
    <>
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <MobileNav />
        <div className="relative mr-auto flex-1 md:grow-0 flex items-center">
          <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            onChange={handleFindUsers}
            // onKeyPress={handleKeyFindUsers}
          />
        </div>
        <AvatarDropdown />
      </header>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Tabs defaultValue="all">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="admin">Admin</TabsTrigger>
              <TabsTrigger value="employee">User</TabsTrigger>
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
              <AddUserForm />
            </div>
          </div>
          <TabsContent value="all">
            <Card x-chunk="dashboard-06-chunk-0">
              <CardHeader>
                <CardTitle>Users</CardTitle>
                <CardDescription>Manage Users</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="hidden w-[100px] sm:table-cell">
                        <span className="sr-only">Image</span>
                      </TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>User Id</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Role
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Total Images
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Created at
                      </TableHead>
                      <TableHead>
                        <span className="sr-only">Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {searchKeyword.length === 0
                      ? usersData?.users.map((user: any, index: any) => (
                          <TableRow key={user.id}>
                            <TableCell className="hidden sm:table-cell">
                              <Image
                                alt="Avatar Image"
                                className="aspect-square rounded-md object-cover"
                                height="64"
                                src={`${user.avatarUrl}`}
                                width="64"
                              />
                            </TableCell>
                            <TableCell className="font-medium">
                              {user.name}
                            </TableCell>
                            <TableCell>{user.userId}</TableCell>
                            <TableCell className="hidden md:table-cell">
                              <Badge
                                variant={
                                  user.role === "admin" ? `default` : "outline"
                                }
                              >
                                {user.role}
                              </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              25
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {moment(user.createdAt).format("Do MMMM YYYY")}
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    aria-haspopup="true"
                                    size="icon"
                                    variant="ghost"
                                  >
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Toggle menu</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <EditUserForm userData={user}/>
                                  <DropdownMenuItem
                                    onClick={() => handleConfirmDelete(user.id)}
                                  >
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      : searchData.map((user, index) => (
                          <TableRow key={user.id}>
                            <TableCell className="hidden sm:table-cell">
                              <Image
                                alt="Avatar Image"
                                className="aspect-square rounded-md object-cover"
                                height="64"
                                src={`${user.avatarUrl}`}
                                width="64"
                              />
                            </TableCell>
                            <TableCell className="font-medium">
                              {user.name}
                            </TableCell>
                            <TableCell>{user.userId}</TableCell>
                            <TableCell className="hidden md:table-cell">
                              <Badge
                                variant={
                                  user.role === "admin" ? `default` : "secondary"
                                }
                              >
                                {user.role}
                              </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              25
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {moment(user.createdAt).format("Do MMMM YYYY")}
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    aria-haspopup="true"
                                    size="icon"
                                    variant="ghost"
                                  >
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Toggle menu</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem>Edit</DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => handleConfirmDelete(user.id)}
                                  >
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <div className="text-xs text-muted-foreground">
                  pagination later
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="admin">
            <Card x-chunk="dashboard-06-chunk-0">
              <CardHeader>
                <CardTitle>Users</CardTitle>
                <CardDescription>Manage Users</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="hidden w-[100px] sm:table-cell">
                        <span className="sr-only">Image</span>
                      </TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>User Id</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Role
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Total Images
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Created at
                      </TableHead>
                      <TableHead>
                        <span className="sr-only">Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {adminsData?.map((user, index) => (
                      <TableRow key={user.id}>
                        <TableCell className="hidden sm:table-cell">
                          <Image
                            alt="Avatar Image"
                            className="aspect-square rounded-md object-cover"
                            height="64"
                            src={`${user.avatarUrl}`}
                            width="64"
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          {user.name}
                        </TableCell>
                        <TableCell>{user.userId}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Badge
                            variant={
                              user.role === "admin" ? `default` : "outline"
                            }
                          >
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          25
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {moment(user.createdAt.toString()).format(
                            "Do MMMM YYYY"
                          )}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <div className="text-xs text-muted-foreground">
                  pagination later
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="employee">
            <Card x-chunk="dashboard-06-chunk-0">
              <CardHeader>
                <CardTitle>Users</CardTitle>
                <CardDescription>Manage Users</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="hidden w-[100px] sm:table-cell">
                        <span className="sr-only">Image</span>
                      </TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>User Id</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Role
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Total Images
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Created at
                      </TableHead>
                      <TableHead>
                        <span className="sr-only">Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userFilterData?.map((user, index) => (
                      <TableRow key={user.id}>
                        <TableCell className="hidden sm:table-cell">
                          <Image
                            alt="Avatar Image"
                            className="aspect-square rounded-md object-cover"
                            height="64"
                            src={`${user.avatarUrl}`}
                            width="64"
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          {user.name}
                        </TableCell>
                        <TableCell>{user.userId}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Badge
                            variant={
                              user.role === "admin" ? `default` : "outline"
                            }
                          >
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          25
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {moment(user.createdAt.toString()).format(
                            "Do MMMM YYYY"
                          )}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <div className="text-xs text-muted-foreground">
                  pagination later
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
};

export default UserContent;
