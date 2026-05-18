"use client"

import dynamic from "next/dynamic"
import "@mdxeditor/editor/style.css"

// Dynamically import MDXEditor with ssr:false — relies on browser APIs
const Editor = dynamic(
  () =>
    import("@mdxeditor/editor").then((mod) => {
      function WrappedEditor(props: {
        value: string
        onEditorChange: (md: string) => void
        height: number
        placeholder: string
      }) {
        const {
          MDXEditor,
          toolbarPlugin,
          headingsPlugin,
          listsPlugin,
          linkPlugin,
          linkDialogPlugin,
          imagePlugin,
          tablePlugin,
          codeBlockPlugin,
          codeMirrorPlugin,
          quotePlugin,
          markdownShortcutPlugin,
          UndoRedo,
          BoldItalicUnderlineToggles,
          StrikeThroughSupSubToggles,
          ListsToggle,
          BlockTypeSelect,
          CreateLink,
          InsertImage,
          InsertTable,
          InsertCodeBlock,
          Separator,
        } = mod

        return (
          <>
            <style>{`
              /* ── Editor wrapper: fixed height, project border ───────────── */
              .mdxeditor-wrapper {
                height: ${props.height}px;
                border: 1px solid rgba(254, 254, 254, 0.2);
                border-radius: 8px;
                overflow: hidden;
                display: flex;
                flex-direction: column;
              }

              /* ── Editor root: fill wrapper, scroll when content overflows ─ */
              .mdxeditor-wrapper .mdxeditor {
                flex: 1;
                min-height: 0;
                overflow-y: auto;

                /*
                 * Override editor CSS variables to match project theme.
                 * --basePageBg defaults to "white" even in .dark-theme — fix that,
                 * plus align borders and text colors with the style guide.
                 */
                --basePageBg: #1a1a1a;
                --baseBase: #1a1a1a;
                --baseBg: #1f2421;
                --baseBgSubtle: #1f2421;
                --baseBgHover: #272a2d;
                --baseBgActive: #363a3f;
                --baseLine: rgba(254, 254, 254, 0.2);
                --baseBorder: rgba(254, 254, 254, 0.2);
                --baseBorderHover: rgba(254, 254, 254, 0.3);
                --baseSolid: #696e77;
                --baseSolidHover: #777b84;
                --baseText: #c8c8cd;
                --baseTextContrast: #fefefe;
              }

              /* ── Content area should scroll independently inside the editor ─ */
              .mdxeditor-wrapper .mdxeditor > div:last-child {
                flex: 1;
                min-height: 0;
                overflow-y: auto;
              }
            `}</style>
            <div className="dark-theme mdxeditor-wrapper">
              <MDXEditor
                markdown={props.value}
                onChange={props.onEditorChange}
                placeholder={props.placeholder}
                plugins={[
                  toolbarPlugin({
                    toolbarContents: () => (
                      <>
                        <UndoRedo />
                        <Separator />
                        <BlockTypeSelect />
                        <Separator />
                        <BoldItalicUnderlineToggles />
                        <StrikeThroughSupSubToggles />
                        <Separator />
                        <ListsToggle />
                        <Separator />
                        <CreateLink />
                        <InsertImage />
                        <InsertTable />
                        <Separator />
                        <InsertCodeBlock />
                      </>
                    ),
                  }),
                  headingsPlugin(),
                  listsPlugin(),
                  linkPlugin(),
                  linkDialogPlugin(),
                  imagePlugin(),
                  tablePlugin(),
                codeBlockPlugin({ defaultCodeBlockLanguage: 'text' }),
                codeMirrorPlugin({
                  codeBlockLanguages: {
                    text: 'Plain Text',
                    js: 'JavaScript',
                    ts: 'TypeScript',
                    jsx: 'JSX',
                    tsx: 'TSX',
                    css: 'CSS',
                    scss: 'SCSS',
                    html: 'HTML',
                    json: 'JSON',
                    bash: 'Bash',
                    python: 'Python',
                    sql: 'SQL',
                    yaml: 'YAML',
                    markdown: 'Markdown',
                    xml: 'XML',
                  },
                }),
                quotePlugin(),
                  markdownShortcutPlugin(),
                ]}
              />
            </div>
          </>
        )
      }
      return WrappedEditor
    }),
  { ssr: false },
)

interface HugeRTEEditorProps {
  /** Markdown content to edit */
  value: string
  /** Called with updated markdown on every editor change */
  onChange: (markdown: string) => void
  /** Editor height in px (default 400) */
  height?: number
  /** Placeholder text */
  placeholder?: string
  /** Label displayed above the editor */
  label: string
}

export default function HugeRTEEditor({
  value,
  onChange,
  height = 400,
  placeholder = "Write content…",
  label,
}: HugeRTEEditorProps) {
  return (
    <div style={{ marginBottom: "24px" }}>
      <label
        style={{
          color: "#c8c8cd",
          fontSize: "14px",
          display: "block",
          marginBottom: "10px",
          fontFamily: "Raleway, sans-serif",
        }}
      >
        {label}
      </label>
      <Editor
        value={value}
        onEditorChange={onChange}
        height={height}
        placeholder={placeholder}
      />
    </div>
  )
}
