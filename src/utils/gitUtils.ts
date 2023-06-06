import { simpleGit } from 'simple-git';

type GitInfo = {
    sha: string
    branch: string
    owner: string
    repo: string
    ref: string
}

const _getBranchNameFromRefs = (refs: string): string | void => {
    const refParts = refs.split(',')

    if (refParts.length === 0) {
        console.error('No ref parts found')
        return
    }

    const ref = refParts[0]
    const branchName = ref.split('->')[1].trim()

    return branchName
}

export const getGitHubInfo = async (): Promise<GitInfo | void> => {
    const options = {
        baseDir: process.cwd(),
        binary: 'git',
        maxConcurrentProcesses: 6,
        trimmed: false,
    }

    const git = simpleGit(options);
    const logInfo = await git.log()

    if (logInfo.all.length === 0) {
        console.debug('No git log found')
        return
    }

    /// Get latest commit
    const latestCommit = logInfo.latest

    if (!latestCommit) {
        console.debug('No latest commit found')
        return
    }

    const hash = latestCommit.hash
    const refs = latestCommit.refs
    const branchName = _getBranchNameFromRefs(refs)

    if (!branchName) {
        console.debug('No branch name found')
        return
    }
    
    console.debug({ branchName })
    console.debug({ hash, refs })

    const remote = await git.remote(['-v'])

    if (!remote) {
        console.debug('No remote found')
        return
    }

    const regex = /^(?:.*github\.com[\/:])?([^\s\/]+)\/([^\s\/]+?)(?:\.git)?(?:\s|$)/g
    const matches = regex.exec(remote)

    console.log({ matches })

    if (!matches || matches.length < 2) {
        console.debug('No matches found, invalid remote')
        return
    }

    const owner = matches[1]
    const repo = matches[2]

    console.log({ owner, repo })

    return {
        ref: `refs/heads/${branchName}`,
        sha: hash,
        branch: branchName,
        owner,
        repo
    }
}