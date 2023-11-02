const { getInfo, getInfoFromPullRequest } = require('@changesets/get-github-info')

module.exports = {
  getDependencyReleaseLine: async (
    changesets,
    dependenciesUpdated,
    options
  ) => {
    if (!options.repo) {
      throw new Error(
        'Please provide a repo to this changelog generator like this:\n"changelog": ["@changesets/changelog-github", { "repo": "org/repo" }]'
      );
    }

    if (dependenciesUpdated.length === 0) return ''

    const changesetLink = `- Updated dependencies [${(
      await Promise.all(
        changesets.map(async (cs) => {
          if (cs.commit) {
            const { links } = await getInfo({
              repo: options.repo,
              commit: cs.commit,
            })

            return links.commit
          }
        })
      )
    )
      .filter((_) => _)
      .join(', ')}]:`

    const updatedDepenenciesList = dependenciesUpdated.map(
      (dependency) => `  - ${dependency.name}@${dependency.newVersion}`
    )

    return [changesetLink, ...updatedDepenenciesList].join('\n')
  },
  getReleaseLine: async (changeset, type, options) => {
    if (!options || !options.repo) {
      throw new Error(
        'Please provide a repo to this changelog generator like this:\n"changelog": ["@changesets/changelog-github", { "repo": "org/repo" }]'
      );
    }

    let prFromSummary
    let commitFromSummary
    const usersFromSummary = []

    const replacedChangelog = changeset.summary
      .replace(/^\s*(?:pr|pull|pull\s+request):\s*#?(\d+)/im, (_, pr) => {
        const num = Number(pr)

        if (!isNaN(num)) prFromSummary = num

        return ''
      })
      .replace(/^\s*commit:\s*([^\s]+)/im, (_, commit) => {
        commitFromSummary = commit

        return ''
      })
      .replace(/^\s*(?:author|user):\s*@?([^\s]+)/gim, (_, user) => {
        usersFromSummary.push(user)

        return ''
      })
      .trim()

    const [firstLine, ...futureLines] = replacedChangelog
      .split('\n')
      .map((l) => l.trimRight())

    const links = await (async () => {
      if (prFromSummary !== undefined) {
        let { links } = await getInfoFromPullRequest({
          repo: options.repo,
          pull: prFromSummary,
        })

        if (commitFromSummary) {
          links = {
            ...links,
            commit: `[\`${commitFromSummary}\`](https://github.com/${options.repo}/commit/${commitFromSummary})`,
          }
        }

        return links
      }
      const commitToFetchFrom = commitFromSummary || changeset.commit

      if (commitToFetchFrom) {
        const { links } = await getInfo({
          repo: options.repo,
          commit: commitToFetchFrom,
        })

        return links
      }

      return {
        commit: null,
        pull: null,
        user: null,
      }
    })()

    // const users = usersFromSummary.length
    //   ? usersFromSummary
    //     .map(
    //       (userFromSummary) =>
    //         `[@${userFromSummary}](https://github.com/${userFromSummary})`
    //     )
    //     .join(', ')
    //   : links.user

    // const usersStr = users ? ` \[${users}\]` : ''

    const suffix = [
      links.pull === null ? '' : ` (${links.pull})`,
      links.commit === null ? '' : ` (${links.commit})`
    ].join('')

    const firstLineWithPrefix = `- ${firstLine}`

    if (futureLines.length === 0) {
      return `${firstLineWithPrefix}${suffix}`
    }

    return `${firstLineWithPrefix}\n${futureLines
      .map((l) => `  ${l}`)
      .join('\n')}\n  ${suffix}`
  },
}
