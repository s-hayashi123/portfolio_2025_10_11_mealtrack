import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldSeparator,
} from "@/components/ui/field";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-4", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-4 md:p-6">
            <FieldGroup>
              <div className="flex flex-col items-center gap-1 text-center">
                <h1 className="text-2xl font-bold mt-0 mb-1">サインアップ</h1>
                <p className="text-muted-foreground text-sm text-balance m-0">
                  サインアップ方法を選択してください
                </p>
              </div>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card mt-2 mb-2">
                または次で続行
              </FieldSeparator>
              <Field className="grid grid-cols-2 gap-3">
                <Button variant="outline" type="button" className="py-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width={24}
                    height={24}
                  >
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="sr-only">Googleでサインアップ</span>
                </Button>
                <Button variant="outline" type="button" className="py-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="12"
                      fill="currentColor"
                      opacity="0.15"
                    />
                    <path
                      d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                      fill="currentColor"
                    />
                    <path
                      d="M12 14c-3.31 0-6 1.343-6 3v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-1c0-1.657-2.69-3-6-3z"
                      fill="currentColor"
                      opacity="0.7"
                    />
                  </svg>
                  <span className="sr-only">ゲストとして始める</span>
                </Button>
              </Field>
              <FieldDescription className="text-center mt-2 mb-0">
                すでにアカウントをお持ちですか？ <a href="#">ログイン</a>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80"
              alt="ロイヤリティーフリーの食事イメージ"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-4 text-center mb-0 mt-0">
        続行することで、<a href="#">利用規約</a>および
        <a href="#">プライバシーポリシー</a>に同意したものとみなされます。
      </FieldDescription>
    </div>
  );
}
