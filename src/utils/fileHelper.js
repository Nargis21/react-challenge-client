
export const fileLanguage = (ext) => {
  if(ext === undefined || null){
    return 'plaintext'
  }else{
      switch(ext){
        // Multiple case using fail-through

        // Markup
          case 'html':case 'htm':case 'xhtml':case 'shtml':case 'jhtm': return 'html';

        // Styling
          case 'css': return 'css'
          case 'scss': return 'scss'
          case 'less': case 'LESS': return 'less'
        
        // Configs & shell
          case 'json': return 'json'
          case 'xml': return 'xml'
          case 'yml': case 'yaml': return 'yaml'
          case 'md': case 'MD': case 'MARKDOWN': return 'markdown'
          case 'sh': case '.csh': case 'Makefile': return 'shell'
          case 'ps1': case 'psd1': case 'psm1': case 'ps1xml': return 'powershell'
          case 'Dockerfile': return 'dockerfile'

        // languages
          case 'js': case 'jsx': case 'ts': case 'tsx': return 'javascript'
          case 'c': return 'c'
          case 'cpp': return 'cpp'
          case 'java': return 'java'
          case 'php': return 'php'
          case 'go': return 'go'
          case 'swift': return 'swift'
          case 'sql': return 'sql'
          case 'mysql': return 'mysql'
          case 'pgsql': return 'pgsql'
          case 'gql': case 'graphql': case 'graphqls': return 'graphql'
          case 'sol': return 'sol'
          case 'scala': return 'scala'
          case 'rs': return 'rust'
          case 'rb': return 'ruby'
          case 'py': return 'python'
          case 'pug': return 'pug'
          case 'pas': return 'pascal'
          case 'lua': return 'lua'
          case 'jl': case 'JL': return 'julia'
          case 'kt': return 'kotlin'
          case 'm': return 'objective-c'
          case 'ini': return 'ini'
          case 'ex': case 'exs': return 'elixir'
          case 'dart': return 'dart'
          case 'cs': return 'csharp'
          case 'coffee': case 'litcoffee': return 'coffeescript'
          case 'clj': case 'cljs': case 'cljc': case 'edn': return 'clojure'
          case 'bat': return 'bat'
          case 'cls': return 'apex'
          default: return 'plaintext'
      }
  }
}

export function getFileLanguage(filename){
  const fileNameArr = filename?.split('.')
  const arrLen = fileNameArr.length 
  return fileLanguage(fileNameArr[arrLen - 1])
 }

export function getTheFileNameFromPath(path){
  // if filename like 'HEAD:src/website/config.json'
  // then return filename only like : config.json

  const pathArr = path?.split('/')
  return pathArr[pathArr.length - 1]
}