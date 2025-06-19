


export interface INotes{
title: string,
content?: string,
category: 'Personal'| 'Work'| 'Study',
pinned?: boolean,
tags:{label:string, color: string}

}

