using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        #region Nested type: Handler

        public class Handler : IRequestHandler<Query, List<Activity>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            #region IRequestHandler<Query,List<Activity>> Members

            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken) =>
                await _context.Activities.ToListAsync(cancellationToken: cancellationToken);

            #endregion
        }

        #endregion

        #region Nested type: Query

        public class Query : IRequest<List<Activity>>
        {
        }

        #endregion
    }
}