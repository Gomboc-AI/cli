import { simpleGit } from 'simple-git';

export type GitInfo = {
    sha: string
    branch: string
    repositoryOwner: string
    repository: string
    ref: string
}

const _getBranchNameFromRefs = (refs: string): string => {
    const refParts = refs.split(',')
    if (refParts.length === 0) {
        throw new Error('No ref parts found')
    }
    const ref = refParts[0]
    return ref.split('->')[1].trim()
}

export const getGitHubInfo = async (): Promise<GitInfo> => {
    const options = {
        baseDir: process.cwd(),
        binary: 'git',
        maxConcurrentProcesses: 6,
        trimmed: false,
    }

    const git = simpleGit(options);
    const logInfo = await git.log()

    if (logInfo.all.length === 0) {
        throw new Error('No git log found')
    }

    /// Get latest commit
    const latestCommit = logInfo.latest

    if (!latestCommit) {
        throw new Error('No latest commit found')
    }

    const hash = latestCommit.hash
    const refs = latestCommit.refs
    const branchName = _getBranchNameFromRefs(refs)

    if (!branchName) {
        throw new Error('No branch name found')
    }

    const remote = await git.remote(['-v'])

    if (!remote) {
        throw new Error('No remote found')
    }

    const regex = /^(?:.*github\.com[/:])?([^\s/]+)\/([^\s/]+?)(?:\.git)?(?:\s|$)/g
    const matches = regex.exec(remote)

    if (!matches || matches.length < 2) {
        throw new Error('No matches found, invalid remote')
    }

    const repositoryOwner = matches[1]
    const repository = matches[2]

    return {
        ref: `refs/heads/${branchName}`,
        sha: hash,
        branch: branchName,
        repositoryOwner,
        repository
    }
}