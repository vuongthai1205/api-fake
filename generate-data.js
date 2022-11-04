const { faker } = require('@faker-js/faker');
const fs = require('fs');
faker.locale = 'vi'
const randomProfileList = (n) => {
    if (n <=0 ) return []

    const profileList = []

    let i = 0
    Array.from(new Array(n)).forEach( () => {
        i++
        const profile = {
            id: i,
            avatar: faker.image.avatar(),
            birthday: faker.date.birthdate(),
            email: faker.internet.email(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
        }

        profileList.push(profile)
    })
    return profileList
}

const randomPostList = (profileList, postL) => {
    if (postL <= 0) return []
    const postList = []

    for (const profile of profileList) {
        Array.from(new Array(postL)).forEach(()=>{
            const post = {
                profileId: profile.id,
                id: faker.datatype.uuid(),
                title: faker.commerce.productName(),
                description: faker.commerce.productDescription(),
            }
            postList.push(post)
        })
    }
    return postList
}

const randomCommentList = (postList, n) => {
    if (n <= 0) return []
    const commentList = []
    for (const post of postList) {
        Array.from(new Array(n)).forEach(() => {
            const comment = {
                postId: post.id,
                id: faker.datatype.uuid(),
                description: faker.commerce.productDescription(),
            }
            commentList.push(comment)
        })
    }
    return commentList
}

(
    () =>{
        const profileList = randomProfileList(4); 
        const postList = randomPostList(profileList, 5)
        const commentList = randomCommentList(postList, 2)
        const db = {
            posts: postList,
            comments: commentList,
            profile: profileList
        }
        fs.writeFile('db.json', JSON.stringify(db), () => {
            console.log('write file successfully')
        })
    }
)()


