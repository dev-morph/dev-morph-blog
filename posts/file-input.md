---
slug: 'file-input'
title: 'Preview 있는 File Input 만들기(Next.js, TS)'
date: '2024-01-29'
image: file-input.png
excerpt: React && TypeScript로 커스텀 File Input 만들기(feat. Preview)
isFeatured: true
---

현재 블로그에서 포스팅의 편리성을 위해 이미지 업로드를 할 수 있는 기능이 필요했습니다. 이를 위해 사진 이미지를 미리 보여주는 file input 컴포넌트를 만들었고, 이번 포스트에서는 어떻게 구현했는지 정리해 보고자 합니다. CSS에 대한 포스트가 아님으로 CSS 부분은 최소화하고, 구현 로직에 대해 코드로 설명하겠습니다.

#

---

#

# **컴포넌트 설계**

#

![Custom FileInput 작동 모습](file-input-sample.gif)  

#

무엇을 만들기 전에, 내가 만들고자 하는 것의 핵심 기능은 무엇인지, 어떻게 사용할 것인지 정리하는 부분은 정말 중요한 것 같습니다.  

#
## hoi
## 핵심기능
제가 구현 하고자 하는 **File Input**의 핵심기능은 아래와 같습니다.  
1. **복수의 이미지 파일들을 버튼을 통해 업로드 할 수 있다.**
2. **복수의 이미지 파일들을 preview 쪽에 Drag&Drop으로 업로드 할 수 있다.**
3. **현재 업로드한 파일의 preview를 보여준다.**
4. **preview 우측상단의 삭제 버튼을 통해 업로드한 파일을 삭제 할 수 있다.**

#

## 사용방법
저는 해당 컴포넌트를 아래와 같은 방식으로 사용하고 싶습니다.  
File 리스트 타입을 가진 useState를 선언하고, files와 setFiles 함수만 간단히 전달하면 나머지 preview, 삭제 버튼 등의 기능은 내부적으로 처리가 되었으면 좋겠습니다.  

#

이후, 선택된 파일들을 서버에 보낼 때에는 files를 사용하면 될 것 입니다.
```js
//...
const [files, setFiles] = useState<File[]>([]);
//...
<FileInput files={files} setFiles={setFiles} />
//...
```  

#

---

# **기능 구현**  
Input태그를 사용하는 방법자체는 매우 간단합니다. 아래처럼 type을 file로, 그리고 multiple 속성을 주면 됩니다.  
```html
//accept는 Input이 허용할 파일 유형을 나타냅니다.
<input type="file" multiple accept="image/*" />
```  

#

이 태그를 그대로 사용해도 되지만, CSS를 커스텀해주기 위해서는 아래의 추가 작업이 필요합니다.  

1. input에 display:none; 속성을 줘서 보이지 않게 한다.
2. useRef를 활용하여, 커스텀 버튼이 클릭되면 Input태그가 클릭되게 한다.
3. 팝업된 파일선택창에서 파일은 선택하면, trigger되는 이벤트인 change에 이벤트 리스너를 단다.

#

---

## JSX 구조 잡기
기본적인 JSX구조를 먼저 잡아 보겠습니다.  

![Custom FileInput 구조](jsx-structure.png)  

크게 **타이틀**, **Preview**, **CustomButton** 으로 구성되어 있습니다. 
Input태그에는 **display:none;** 속성을 부여했고, **버튼을 클릭할 경우, useRef를 활용하여 Input태그를 클릭하게 했습니다.**  
Preview지역에 Drop이벤트가 일어나거나, File을 선택하는 이벤트가 발생하면, **selectFile**가 실행됩니다.
```html
<Top05>사진첨부</Top05>
<FileThumbnails
    files={files}
    deleteFileHandler={deleteFile}
    addFileHandler={() => inputRef.current?.click()}
    onDrop={selectFile}
/>
<Spacing size={15} />
<Button
    onClick={() => inputRef.current?.click()}
    style="outline"
    fontSize="0.75rem"
    btnType="button"
>
    사진을 추가해주세요
</Button>
<input
    id="file"
    ref={inputRef}
    type="file"
    multiple
    accept="image/*"
    style={{ display: 'none' }}
    onChange={selectFile}
/>
```

#

#

---

## selectFile 구현하기
파일을 선택할 때 실행되는 selectFile 함수를 구현해보도록 하겠습니다.  
**drop이벤트**와,**파일 추가 버튼을 클릭하는 경우**로 나누어 분기처리 해주어야 합니다.

#

기존에 추가된 파일이 있는 경우, 덮어 쓰는 것이 아니기 때문에, spread문법을 이용해 파일을 추가해주었습니다.
```js
export default function FileInput({ files, setFiles }: FileInputProps) {
    //...
    function selectFile(
        e: React.DragEvent | React.ChangeEvent<HTMLInputElement>
    ) {
        e.preventDefault();
        let selectedFiles = [] as File[];
        if (e.type === 'drop') {
            const event = e as React.DragEvent;
            //Drop인 경우, dataTransfer 속성안에서 files를 찾을 수 있다.
            selectedFiles = Array.from(event.dataTransfer.files);
        } else if (e.type === 'change') {
            const inputEl = e.target as HTMLInputElement;
            //Change인 경우, event.target.files에서 files를 찾을 수 있다.
            selectedFiles = inputEl.files ? Array.from(inputEl.files) : [];
        }

        setFiles((prev) => [...prev, ...selectedFiles]);
    }
    //...
}
```

#

---

## Preview - URL.createObjectURL
selectFile을 통해 추가된 파일들을 미리 보여 주는 기능을 URL.createObjectURL()을 이용하여 구현했습니다.

#

**URL.createObjectURL**는 File, Blob, MediaSource객체를 인자로 받고, 전달받은 객체를 가리키는 URL을 DOMString으로 변환하여 돌려줍니다.[(API 세부 내역링크)](https://developer.mozilla.org/ko/docs/Web/API/URL/createObjectURL_static)

#
앞서 저는 선택한 파일들의 리스트(File[])를 FileThumbnails에 files props로 내려줬습니다. FileThumbnails에서 아래처럼 map을 이용해 순회하면서 렌더 해주었습니다.  
Image는 next/image를 사용했고, src 부분에 집중해 주시면 되겠습니다.
```js
//FileThumbnails.tsx
type FileThumbnailsProps = {
	files: File[];
	deleteFileHandler?: Function;
	addFileHandler?: MouseEventHandler<HTMLDivElement>;
	onDrop?: Function;
};

export default function FileThumbnails({
	files,
	deleteFileHandler,
	addFileHandler,
	onDrop
}: FileThumbnailsProps) {
//...
    {files.map((file) => (
        <div className={classes.image} key={file.name}>
            <Image
                src={URL.createObjectURL(file)}
                width={80}
                height={80}
                sizes="80px"
                alt={file.name}
                placeholder="blur"
                blurDataURL={URL.createObjectURL(file)}
            />
            <div
                className={classes.delete__btn}
                onClick={() => clickDeleteBtn(file.name)}
            >
                <CloseIcon size="0.8rem" />
            </div>
        </div>
    ))}
}
//...
```
이제 추가한 파일들의 preview를 볼 수 있습니다.  
참고로, 여기에서 preview 우측 상단에 delete 버튼을 추가하고, 클릭 시 clickDeleteBtn 함수를 호출하게 합니다.

#

---

## Drop이벤트 구현하기
위에서 FileThumbnails에 onDrop Props로 selectFile을 넘겨줬습니다. 이 부분을 어떻게 마무리해줘야 하는지 간단히 정리해 보겠습니다.

Thumbnails 컴포넌트 최상단 요소에 아래와 같이 이벤트 리스너를 설정해 주어야 합니다.  
#

이는 우리가 파일을 드래그 & 드롭하게 되면 생기는 이벤트들 중 drop 이벤트가 일어났을 때에만 원하는 함수를 실행시키기 위함입니다.
[(드래그 & 드랍시 발생하는 이벤트 리스트 참고)](https://developer.mozilla.org/ko/docs/Web/API/HTML_Drag_and_Drop_API)

```js
<div className={classes.image__wrapper}
    onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
    }}
    onDragEnter={(e) => {
        e.preventDefault();
        e.stopPropagation();
    }}
    onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onDrop && onDrop(e)
    }
    }
>
    //...
</div>
```
이렇게 하면 우리가 파일을 드래그 & 드롭 했을 때 정상적으로 selectFile이 실행되는 것을 확인할 수 있습니다.


#

---

## 추가 파일 제거 기능
추가된 파일을 목록에서 제거 하는 방법은 아래 처럼 fileName을 이용해 줬습니다.
```js
//FileInput.tsx
//...
function deleteFile(fileName: string) {
    setFiles((prev) => prev.filter((file) => file.name !== fileName));
}
```

자! 이제 Preview를 보여주는 커스텀 File Input 컴포넌트가 모두 완성되었습니다.  
확실히 각 기능을 담당하는 컴포넌트들을 미리 만들어 놓은 상태에서 위에서 기술한 **JSX 구조 잡기**에서처럼 코드를 작성하다 보니, 가독성도 좋고 개발 시간도 줄일 수 있었습니다.

#

내가 필요한 기능이 있으면 바로바로 기능들을 하나씩 추가할 수 있다는 부분이 참 재미있고, 자신만의 기술 블로그를 가지는 매력인 듯합니다.  