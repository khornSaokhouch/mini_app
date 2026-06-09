export default function DashboardLoading() {
  return (
    <div className="flex flex-col gap-6 w-full animate-pulse">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-8 w-48 rounded-md bg-muted/60"></div>
          <div className="h-4 w-32 rounded-md bg-muted/40"></div>
        </div>
        <div className="h-10 w-32 rounded-md bg-muted/60"></div>
      </div>

      {/* Cards Skeleton */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="h-4 w-24 rounded bg-muted/60"></div>
              <div className="h-4 w-4 rounded-full bg-muted/60"></div>
            </div>
            <div className="space-y-2">
              <div className="h-8 w-20 rounded bg-muted/60"></div>
              <div className="h-3 w-32 rounded bg-muted/40"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Content Area Skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4 rounded-xl border bg-card p-6 h-[400px]">
          <div className="h-6 w-32 rounded bg-muted/60 mb-6"></div>
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-10 w-full rounded bg-muted/40"></div>
            ))}
          </div>
        </div>
        <div className="col-span-3 rounded-xl border bg-card p-6 h-[400px]">
          <div className="h-6 w-32 rounded bg-muted/60 mb-6"></div>
          <div className="space-y-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-muted/60"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-4 w-3/4 rounded bg-muted/60"></div>
                  <div className="h-3 w-1/2 rounded bg-muted/40"></div>
                </div>
                <div className="h-4 w-12 rounded bg-muted/60"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
